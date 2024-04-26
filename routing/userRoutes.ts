import { Router } from "express";
import {
  addUser,
  delUser,
  getUserById,
  getUsers,
  loginUser,
  refreshToken,
  registerUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);

router.post("/users", addUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refreshToken", refreshToken);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", delUser);

export default router;
