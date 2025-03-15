import Router from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/userMiddleware";

const router = Router();

// Router to create a new user 
router.post("/create",
  UserValidation.createUser,
  UserController.createUser);

// Router to get a user by ID
router.get("/:id", UserController.getUser);

// Router to update a user by ID
router.put("/:id", UserController.updateUser);

// Router to delete a user by ID
router.delete("/:id", UserController.deleteUser);

// Router to login a user 
router.post("/login", UserController.login);

// Router to logout a user 
router.post("/logout", UserController.logout);

export default router;