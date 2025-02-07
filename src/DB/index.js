import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      "\x1b[32m%s\x1b[0m",
      `🚀 [MongoDB Connected]: Successfully connected to the database! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `❌ [MongoDB Connection Error]: Failed to connect to the database. Error: ${error.message}`
    );
    process.exit(1);
  }
};

export default connectDB;
