import { Router } from "express";
import {
  addUser,
  delUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);

router.post("/users", addUser);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", delUser);

export default router;
