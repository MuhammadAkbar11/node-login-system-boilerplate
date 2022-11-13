import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import pino from "pino";
import pinoPretty from "pino-pretty";
import DayjsUTC from "./date.util.js";
import chalk from "chalk";

const argv = yargs(hideBin(process.argv)).argv;

const textWhite = chalk.hex("#DFDFDE");
const bgWhite = chalk.bgHex("#DFDFDE");
const bgInfo = chalk.bgHex("#00FFAB");
const textInfo = chalk.hex("#00FFAB");
const bgError = chalk.bgHex("#DC3545");
const textError = chalk.hex("#DC3545");

const timeformat = "DD.MM.YYYY HH:mm:ss";
const time =
  argv.mode !== "production"
    ? DayjsUTC().tz("Asia/Jakarta").format(timeformat)
    : DayjsUTC().format(timeformat);

const streams = [
  {
    stream: pinoPretty({
      colorize: true,
      destination: 1,
      ignore: "pid",
      customPrettifiers: {
        time: time => textWhite(`🕰  (${time})`),
        level: logLevel => {
          if (logLevel === "info") {
            return `${textInfo(logLevel.toLocaleUpperCase())}`;
          }
          if (logLevel === "error")
            return `${textError(logLevel.toLocaleUpperCase())}`;
          return logLevel.toUpperCase();
        },
      },
    }),
  },
];

const Logger = pino(
  {
    prettifier: true,
    level: "info",
    formatters: {
      level: label => {
        return { level: label };
      },
      // bindings(bindings) {
      //   return {};
      // },
    },

    timestamp: () => `,"time": "${time}"`,
  },
  pino.multistream(streams)
);

export const LoggerInfo = (label, msg, ...args) => {
  const labelTemp = chalk.bold(chalk.black(`[${label}]`));
  Logger.info(`${bgInfo(labelTemp)} ${textInfo(msg)}`, ...args);
};

export const LoggerError = (label, msg, obj, ...args) => {
  const labelTemp = chalk.bold(textWhite(`[${label}]`));
  Logger.error(obj, `${bgError(labelTemp)} ${textError(msg)}`, ...args);
};

export default Logger;
