import { Request, Response } from "express";
import User from "../models/UserModel";
import { comparePassword, hashPassword } from "../utils/auth";
import Token from "../models/TokenModel";
import { generateToken } from "../utils/token";
import AuthEmail from "../emails/email";
import { generateJWT } from "../utils/jwt";

class UserController {

  // Create a new user
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (user) {
        res.status(409).json({ message: "El usuario ya existe" });
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
      await AuthEmail.sendCreateUserEmail({
        email: newUser.email,
        name: newUser.name,
        token: token.token
      });

      // Save the user
      Promise.allSettled([newUser.save(), token.save()]);
      res.status(201).json({ message: "Revisa tu correo electrónico para confirmar" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  };

  // Confirm user
  static async confirmUser(req: Request, res: Response) {
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

      // Check if password is correct
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Contraseña incorrecta" });
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

  // Logout a user TODO:
  static async logout(req: Request, res: Response) {
    try {
      res.send("Logout a user");
    } catch (error) {
      res.status(500).json({ message: "Error al logout el usuario" });
    }
  };

  // Get a user by ID TODO:
  static async getUser(req: Request, res: Response) {
    try {
      res.send("Obtener un usuario");
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  };

  // Update a user by ID TODO:
  static async updateUser(req: Request, res: Response) {
    try {
      res.send("Usuario actualizado correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  };

  // Delete a user by ID TODO:
  static async deleteUser(req: Request, res: Response) {
    try {
      res.send("Usuario eliminado correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  };

}

export default UserController;