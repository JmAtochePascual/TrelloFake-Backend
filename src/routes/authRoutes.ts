import { Router } from "express";
import AuthValidation from "../middlewares/AuthMiddleware";
import AuthController from "../controllers/AuthController";
const route = Router();

// Route to create a new user
route.post('/create-account',
  AuthValidation.validateCreateUser,
  AuthController.createAccount);

export default route;