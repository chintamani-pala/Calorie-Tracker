import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  verifyToken,
} from "../controllers/user.controller.js";
import { isAutheticated } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.post("/registration", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAutheticated, logoutUser);
userRouter.get("/verify-token", verifyToken);

export default userRouter;
