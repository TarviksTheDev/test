import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiErrors.js";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const verifyJwt = asyncHandler(
  async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(
        401,
        "Unauthorized User",
        [],
        undefined,
        undefined,
        false
      );
    }

    try {
      const decodeToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const user = await User.findById(decodeToken?._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );
      if (!user) {
        throw new ApiError(
          401,
          "Invalid Access Token",
          undefined,
          undefined,
          undefined,
          false
        );
      }
      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(
        401,
        error?.message || "Invalid access tokens",
        undefined,
        undefined,
        undefined,
        false
      );
    }
  }
);

export const getLoggedInUserOrIgnore = asyncHandler(
  async (req, res, next) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(
        401,
        "Unauthorized User",
        [],
        undefined,
        undefined,
        false
      );
    }

    try {
      const decodeToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const user = await User.findById(decodeToken?._id).select(
        "-password -refreshToken -emailVerification -emailVerificationExpiry"
      );
      res.user = user;
      next();
    } catch (error) {
      next();
    }
  }
);

export const verifyPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
      throw new ApiError(
        401,
        "Unauthorized request",
        [],
        undefined,
        undefined,
        false
      );
    }
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new ApiError(
        403,
        "You are not allowed to perform this action",
        [],
        undefined,
        undefined,
        false
      );
    }
  });
