import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "";
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL).then((data) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error) {
    console.log(error);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
