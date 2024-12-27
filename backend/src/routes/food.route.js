import express from "express";
import {
  createFoodLog,
  getFoodLog,
  getFoodLogDateWise,
} from "../controllers/food.controller.js";
import { isAutheticated } from "../middlewares/auth.middleware.js";

const foodRouter = express.Router();

foodRouter.post("/createFoodLog", isAutheticated, createFoodLog);
foodRouter.get("/getAllFoodLog", isAutheticated, getFoodLog);
foodRouter.get("/getFoodLogDateWise", isAutheticated, getFoodLogDateWise);

export default foodRouter;
