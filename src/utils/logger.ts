import winston from "winston";
// Define log levels type
type LogLevel = "error" | "warn" | "info" | "http" | "debug";

const { combine, timestamp, printf, colorize } = winston.format;

// Typed log format
const logFormat = printf(
  ({ level, message, timestamp }: winston.Logform.TransformableInfo) => {
    return `${timestamp} [${level}]: ${message}`;
  }
);

// Create logger instance
const logger: winston.Logger = winston.createLogger({
  level: "info" as LogLevel,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;
