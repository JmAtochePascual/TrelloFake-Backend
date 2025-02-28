import { Router } from "express";
import AuthValidation from "../middlewares/AuthMiddleware";
import AuthController from "../controllers/AuthController";
const route = Router();

// Route to create a new user
route.post('/create-account',
  AuthValidation.validateCreateUser,
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


export default route;