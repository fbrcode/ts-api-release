import winston from "winston";
import { getEnvironment } from "./env";
import { getAppVersion } from "./file";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

function level(): string {
  const env = getEnvironment();
  const isDevelopment = env !== "production";
  return isDevelopment ? "debug" : "info";
}

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "magenta",
};

winston.addColors(colors);

function colorizer(): winston.Logform.Format {
  const env = getEnvironment();
  const isDevelopment = env === "development";
  return isDevelopment ? winston.format.colorize({ all: true }) : winston.format.uncolorize();
}

const appVersion = getAppVersion();

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  colorizer(),
  winston.format.printf((info) => `${info.timestamp} (v${appVersion}) ${info.level}: ${info.message}`)
);

let transports = [new winston.transports.Console()];
transports[0].silent = process.env.NODE_ENV === "test";

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
