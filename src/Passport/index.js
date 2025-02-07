import passport from "passport";
import User from "../Models/user.model.js";
import {ApiError} from "../Utils/ApiErrors.js";

try {
  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser(async (id, next) => {
    try {
      const user = await User.findById(id);
      if (user) {
        next(null, user);
      } else {
        next(new ApiError(404, "User not found", undefined, "", null, false), null);
      }
    } catch (error) {
      next(
        new ApiError(
          500,
          "Something went wrong while deserializing user. Error: " + error,
          undefined,
          undefined,
          undefined,
          false
        )
      );
    }
  });
} catch (err) {
  console.log("Passport Error:", err);
}
