import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import pino from "pino";
import pinoPretty from "pino-pretty";
import DayjsUTC from "./date.util.js";

const argv = yargs(hideBin(process.argv)).argv;

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
    },
    timestamp: () => `,"time": "${time}"`,
  },
  pino.multistream(streams)
);

export default Logger;
