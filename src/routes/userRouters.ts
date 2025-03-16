import Router from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/userMiddleware";

const router = Router();

// Router to create a new user 
router.post("/create-account",
  UserValidation.createUser,
  UserController.createUser);

// Router to confirm a user by token
router.post("/confirm-account",
  UserValidation.confirmUser,
  UserController.confirmUser);

// Router to reset token
router.post("/resend-token",
  UserValidation.resendToken,
  UserController.resendToken);

// Router to forgot password
router.post("/forgot-password",
  UserValidation.forgotPassword,
  UserController.forgotPassword);

// Router to verify forgot password token
router.post("/verify-token",
  UserValidation.verifyTokenPassword,
  UserController.verifyTokenPassword);

// Router to login a user 
router.post("/login",
  UserValidation.login,
  UserController.login);

export default router;