import passport from "passport";
import UserModel from "../app/models/User.model.js";
import BaseError from "../errors/base.error.js";
import GoogleStrategy from "./strategies/google.strategy.js";
import LocalStrategy from "./strategies/local.strategy.js";

export default function () {
  passport.use(LocalStrategy);
  passport.use(GoogleStrategy);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      const error = new BaseError(
        "Authentication",
        err?.message || "Failed to Login",
        err?.status || 400,
        true,
        { ...err }
      );

      done(error, user);
    }
  });
}
