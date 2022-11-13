import express from "express";
import morgan from "morgan";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import methodOverride from "method-override";
import connectFlash from "connect-flash";
import { STATIC_FOLDER } from "../constants/path.constants.js";
import passportConfig from "../config/passport.config.js";
import DBConnection from "../config/db.config.js";
import MainRoutes from "./routes.js";
import {
  logErrorMiddleware,
  return404,
  returnError,
} from "../middleware/errorHandler.js";

function AppServer(env) {
  passportConfig();
  DBConnection();

  const app = express();
  // Store Session

  const store = MongoStore.create({
    mongoUrl: env.MONGO_URI,
  });

  app.set("view engine", "ejs");
  app.set("views", "src/app/views");

  // Body Parse
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Cors
  app.use(cors());

  // Method override
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // Flash
  app.use(connectFlash());

  // Session
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

  if (env.MODE == "development") {
    app.use(morgan("dev"));
  }

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session({}));

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.userAuth = req.user;
    } else {
      res.locals.userAuth = null;
    }

    next();
  });

  app.use(express.static(STATIC_FOLDER));

  MainRoutes(app);

  app.use(logErrorMiddleware);
  app.use(return404);
  app.use(returnError);

  return app;
}

export default AppServer;
