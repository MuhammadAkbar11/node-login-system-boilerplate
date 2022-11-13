import { Strategy } from "passport-google-oauth20";
import UserModel from "../../app/models/User.model.js";
import { TransfromError } from "../../utils/base.error.js";
import { OAUTH_CLIENTID, OAUTH_CLIENT_SECRET } from "../env.config.js";

const GoogleStrategy = new Strategy(
  {
    clientID: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      password: "",
      image: profile.photos[0]?.value,
    };

    try {
      const user = await UserModel.findOne({ email: profile.emails[0].value });

      if (user) {
        if (user.googleId) {
          done(null, user);
        } else {
          user.googleId = profile.id;
          await user.save();
          done(null, user);
        }
      } else {
        const createdUser = await UserModel.create(newUser);
        done(null, createdUser);
      }
    } catch (error) {
      const err = new TransfromError(error);
      done(err, profile);
    }
  }
);

export default GoogleStrategy;
