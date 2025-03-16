import Router from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middlewares/userMiddleware";

const router = Router();

// Router to create a new user 
router.post("/create",
  UserValidation.createUser,
  UserController.createUser);

// Router to confirm a user by token
router.post("/user-confirm",
  UserValidation.confirmUser,
  UserController.confirmUser);

// Router to login a user 
router.post("/login",
  UserValidation.login,
  UserController.login);

// Router to reset token
router.post("/resent-token",
  UserValidation.resentToken,
  UserController.resentToken);

// Router to logout a user TODO:
router.post("/logout", UserController.logout);

// Router to get a user by ID TODO:
router.get("/:id", UserController.getUser);

// Router to update a user by ID TODO:
router.put("/:id", UserController.updateUser);

// Router to delete a user by ID TODO:
router.delete("/:id", UserController.deleteUser);


export default router;