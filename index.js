import chalk from "chalk";
import * as ENV from "./src/app/config/env.config.js";
import {
  isOperationalError,
  logError,
} from "./src/app/middleware/errorHandler.js";
import AppServer from "./src/app/server.js";
import Logger from "./src/utils/logger.util.js";

ENV.init;

const app = AppServer(ENV);

app.listen(ENV.PORT, () => {
  Logger.info(
    `[SERVER] server running in ${ENV.MODE} mode on port ${ENV.PORT}`
  );
});

process.on("unhandledRejection", error => {
  throw error;
});

process.on("uncaughtException", error => {
  logError(error);
  Logger.error(
    error,
    `${chalk.red("[uncaughtException]".toUpperCase())} ${error.message}`
  );
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
