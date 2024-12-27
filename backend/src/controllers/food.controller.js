import { CatchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import FoodTrackModel from "../models/foodLog.model.js";
import ResponseHandler from "../utils/ResponseHandler.js";

export const createFoodLog = CatchAsyncError(async (req, res) => {
  try {
    const { foodItem, calories, date } = req.body;
    if (!foodItem || !calories || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const log = new FoodTrackModel({
      user: req.user._id,
      foodItem,
      calories,
      date: new Date(date),
    });
    await log.save();
    res.status(201).json(new ResponseHandler(201, "Food log created", log));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const getFoodLog = CatchAsyncError(async (req, res) => {
  try {
    const logs = await FoodTrackModel.find({ user: req.user._id });
    res.status(200).json(new ResponseHandler(200, "Food logs", logs));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const getFoodLogDateWise = CatchAsyncError(async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }
    const logs = await FoodTrackModel.find({
      user: req.user._id,
      date: new Date(date),
    });
    res.status(200).json(new ResponseHandler(200, "Food logs", logs));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
