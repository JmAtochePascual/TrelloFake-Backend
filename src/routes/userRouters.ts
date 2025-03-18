import Router from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/userMiddleware";

const router = Router();

// Router to create a new user 
router.post("/create-account",
  UserValidation.createAccount,
  UserController.createAccount);

// Router to confirm a user by token
router.post("/confirm-account",
  UserValidation.confirmAccount,
  UserController.confirmAccount);

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

// Update password
router.post("/update-password/:token",
  UserValidation.updatePassword,
  UserController.updatePassword);

// Router to login a user 
router.post("/login",
  UserValidation.login,
  UserController.login);

// Router to logout a user 
router.post("/logout",
  UserController.logout);

// Router to get the user data
router.get("/profile",
  UserValidation.authenticatedUser,
  UserController.getProfile);

export default router;