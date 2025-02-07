import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserRoleEnum } from "../constants.js";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
    },
    role: {
      id: {
        type: String,
        default: "new",
      },
      name: {
        type: String,
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.USER,
      },
    },
    pic: {
      type: String,
    },
    about: {
      type: String,
      default: "Hi!",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 15 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};

userSchema.statics.generateEmailVerificationToken = function (user) {
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  return { unHashedToken, hashedToken, tokenExpiry };
};

userSchema.statics.generateForgotPasswordToken = function (user) {
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  return { unHashedToken, hashedToken, tokenExpiry };
};

userSchema.statics.findByEmailOrUsername = async function (email, userName) {
  return this.findOne({ $or: [{ email }, { userName }] });
};

userSchema.methods.hasRefreshToken = function (token) {
  return this.refreshToken === token;
};

const User = mongoose.model("User", userSchema);

export default User;
