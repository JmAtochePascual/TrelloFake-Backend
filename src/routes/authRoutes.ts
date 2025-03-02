import { Router } from "express";
import AuthValidation from "../middlewares/AuthMiddleware";
import AuthController from "../controllers/AuthController";
const route = Router();

// Route to create a new user
route.post('/create-account',
  AuthValidation.validateCreateAccount,
  AuthController.createAccount);

// Route to confirm an account
route.post('/confirm-account',
  AuthValidation.validateConfirmAccount,
  AuthController.confirmAccount);

// Route to login
route.post('/login',
  AuthValidation.validateLogin,
  AuthController.login);

// Resend confirmation token
route.post('/resend-token',
  AuthValidation.validateResendConfirmationToken,
  AuthController.resendConfirmationToken);

// Forgot password
route.post('/forgot-password',
  AuthValidation.validateForgotPassword,
  AuthController.forgotPassword);

// Confirm token password
route.post('/confirm-token-password',
  AuthValidation.validateConfirmAccount,
  AuthController.confirmationTokenPassword);

// Change password
route.post('/change-password/:token',
  AuthValidation.validateChangePassword,
  AuthController.updatePasswordWithToken);

export default route;