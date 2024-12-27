import { CatchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { redis } from "../config/redis.config.js";
import userModel from "../models/user.model.js";
import {
  accessTokenOption,
  refreshTokenOption,
  sendToken,
} from "../utils/jwt.js";

export const registerUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }
    if (password.length < 8) {
      return next(new ErrorHandler("Password must be 8 character", 400));
    }
    const user = {
      name,
      email,
      password,
    };
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = {
      users: {
        name: user.name,
      },
      activationCode,
    };

    await redis.set(
      user.email,
      JSON.stringify({ password, activationCode }),
      "EX",
      5 * 60
    );
    try {
      await sendMail({
        email: user.email,
        subject: "Account activation",
        template: "activation-mail.ejs",
        data,
      });
      res
        .status(201)
        .json(
          new ResponseHandler(
            201,
            `Please check your email ${user.email} to activate your account`,
            { activationToken: activationToken.token }
          )
        );
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

export const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    if (!activation_token || !activation_code) {
      return next(new ErrorHandler("Invalid activation", 400));
    }
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    const { name, email, password } = newUser.user;
    let tempUser = await redis.get(email);
    if (tempUser == null) {
      return next(new ErrorHandler("Activation code expired", 400));
    }
    tempUser = JSON.parse(tempUser);
    if (tempUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid Activation code", 400));
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("Email already exist", 400));
    }
    const date = new Date();
    const currentDate = date.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (tempUser.password == null) {
      return next(new ErrorHandler("Something went wrong", 400));
    }
    await redis.del(email);
    const user = await userModel.create({ name, email, password });
    const userData = {
      name: user.name,
      email: user.email,
      password: tempUser.password,
      date: currentDate,
    };

    try {
      await sendMail({
        email: user.email,
        subject: "Account Created SuccessFully",
        template: "user-registration-complete.ejs",
        data: userData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
    res.status(200).json(new ResponseHandler(200, "Account activated", null));
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    user.password = undefined;

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//logout user
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    // Clear cookies with appropriate path and SameSite settings
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id || "";

    // If you're using Redis, delete the user session from Redis
    if (userId) {
      await redis.del(userId); // Ensure async handling if necessary
    }

    // Send successful response
    res
      .status(200)
      .json(new ResponseHandler(200, "Logged out successfully", null));
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const verifyToken = CatchAsyncError(async (req, res) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "No access token provided" });
  }
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    console.log("yes");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
});
