import { Request, Response } from "express";
import User from "../models/UserModel";
import { comparePassword, hashPassword } from "../utils/auth";
import Token from "../models/TokenModel";
import { generateToken } from "../utils/token";
import AuthEmail from "../emails/email";
import { generateJWT } from "../utils/jwt";

class UserController {

  // Create a new user
  static async createAccount(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (user) {
        res.status(409).json({ message: "El email ya esta registrado" });
        return;
      }

      // Create the user
      const newUser = new User({ name, email, password });

      // Hash the password
      newUser.password = await hashPassword(password);

      // Create the token
      const token = new Token();
      token.token = generateToken();
      token.user = newUser.id;

      // Send the email
      await AuthEmail.emailCreateAccount({
        email: newUser.email,
        name: newUser.name,
        token: token.token
      });

      // Save the user
      Promise.allSettled([newUser.save(), token.save()]);
      res.status(201).json({ message: "Revisa tu correo electrónico para confirmar tu cuenta" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  };

  // Confirm user
  static async confirmAccount(req: Request, res: Response) {
    const { token } = req.body;

    try {
      // Find the token
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        res.status(401).json({ message: "Token no valido" });
        return;
      }

      // Find the user
      const user = await User.findById(tokenExists.user);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Set the user as confirmed
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.status(200).json({ message: "Usuario confirmado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al confirmar el usuario" });
    }
  }

  // Resent token
  static async resendToken(req: Request, res: Response) {
    const { email } = req.body;

    try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Email no registrado" });
        return;
      }

      // Check if the user is confirmed
      if (user.confirmed) {
        res.status(400).json({ message: "Usuario ya confirmado" });
        return;
      }

      // Create the token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      // Send the email
      await AuthEmail.resendTokenEmail({
        email: user.email,
        token: token.token,
        name: user.name
      })

      // Save the token
      await token.save();
      res.status(200).json({ message: "Revisa tu correo electrónico para verificar tu cuenta" });
    } catch (error) {
      res.status(500).json({ message: "Error al reenviar el token" });
    }
  }

  // Forgot password
  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Email no registrado" });
        return;
      }

      // Create the token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      // Send the email
      await AuthEmail.forgotPasswordEmail({
        email: user.email,
        token: token.token,
        name: user.name
      })

      // Save the token
      await token.save();
      res.status(200).json({ message: "Revisa tu correo electrónico para cambiar tu contraseña" });
    } catch (error) {
      res.status(500).json({ message: "Error al reenviar el token" });
    }
  }

  // Verify token password
  static async verifyTokenPassword(req: Request, res: Response) {
    const { token } = req.body;

    try {
      // Find the token
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        res.status(404).json({ message: "Token no encontrado" });
        return;
      }

      // Find the user
      const user = await User.findById(tokenExists.user);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json({ message: "Token válido" });
    } catch (error) {
      res.status(500).json({ message: "Error al verificar el token" });
    }
  }

  // Update password
  static async updatePassword(req: Request, res: Response) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      // Find the token
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        res.status(404).json({ message: "Token no encontrado" });
        return;
      }

      // Find the user
      const user = await User.findById(tokenExists.user);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;

      // Save the user
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la contraseña" });
    }
  }

  // Login a user
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Check if password is correct
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Contraseña incorrecta" });
        return;
      }

      // Check if user is confirmed
      if (!user.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = user.id;

        // send the email
        await AuthEmail.sendUnverifiedLoginEmail({
          email: user.email,
          token: token.token,
          name: user.name
        })

        await token.save();
        res.status(401).json({ message: "Usuario no confirmado, revisa tu correo electrónico para confirmar" });
        return;
      }

      // Generate jwt
      const jwt = generateJWT({ id: user.id });

      // Config cookies
      res.cookie("trelloToken", jwt, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
      });

      // Send response
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Error al login el usuario" });
    }
  };

  // Logout a user
  static async logout(req: Request, res: Response) {
    res.cookie("trelloToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(0)
    });

    res.sendStatus(200);
  }

}

export default UserController;