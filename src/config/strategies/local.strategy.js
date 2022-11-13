import { Strategy } from "passport-local";
import UserModel from "../../app/models/User.model.js";
import BaseError, { TransfromError } from "../../utils/base.error.js";

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return done(null, user);
      }
      throw new BaseError("Authentication", "Failed to Login", 400, true, {
        errorView: "auth/login",
      });
    } catch (err) {
      const error = new BaseError(
        "Authentication",
        err?.message || "Failed to Login",
        err?.status || 400,
        true,
        { ...err }
      );

      done(new TransfromError(error));
    }
  }
);

export default LocalStrategy;
