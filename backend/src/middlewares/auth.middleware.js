import { redis } from "../config/redis.config.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { accessTokenOption, refreshTokenOption } from "../utils/jwt.js";
import { CatchAsyncError } from "./catchAsyncError.middleware.js";
import jwt from "jsonwebtoken";

export const isAutheticated = CatchAsyncError(async (req, res, next) => {
  console.log(req.cookies);
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(new Error("please login to access this resource"));
  }
  let decoded;
  try {
    decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
  } catch (err) {
    updateAccessToken(req, res, next);
    return;
  }

  if (!decoded) {
    return next(new ErrorHandler("Access token is not valid", 400));
  }
  const user = await redis.get(decoded.id);

  if (!user) {
    return next(new ErrorHandler("Please login to access this resources", 400));
  }
  req.user = JSON.parse(user);
  next();
});

const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
  const message = "Could not Verify refresh token";
  if (!decoded) {
    return next(new ErrorHandler(message, 400));
  }
  const session = await redis.get(decoded.id);
  if (!session) {
    return next(
      new ErrorHandler("Please login for access this resources", 400)
    );
  }
  const user = JSON.parse(session);
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "3d",
  });
  req.user = user;
  res.cookie("access_token", accessToken, accessTokenOption);
  res.cookie("refresh_token", refreshToken, refreshTokenOption);

  await redis.set(user._id, JSON.stringify(user), "EX", 7 * 24 * 60 * 60); //7 days cache expire
  next();
});
