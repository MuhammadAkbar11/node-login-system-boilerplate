import chalk from "chalk";
import mongoose from "mongoose";
import Logger, { LoggerError, LoggerInfo } from "../utils/logger.util.js";
import { MONGO_URI } from "./env.config.js";

Logger;

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
    });

    LoggerInfo(
      `MONGOOSE`,
      `mongo connected on 'mongodb://*****:*****@${chalk.bold(
        conn.connection.host
      )}:${chalk.bold(conn.connection.port)}' `
    );

    LoggerInfo(
      `MONGOOSE`,
      `mongo database : ${chalk.bold(conn.connection.name)}`
    );
  } catch (error) {
    LoggerError(
      "MONGOOSE",
      `failed to connected mongo on ${error.message} `,
      error
    );
    process.exit(1);
  }
};

export default DBConnection;
