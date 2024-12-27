import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.route.js";
// import foodRoute from "./routes/foodRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./src/middlewares/error.middleware.js";
import connectDB from "./src/config/db.config.js";
import foodRouter from "./src/routes/food.route.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("/*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not fount`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
