import chalk from "chalk";

const { greenBright, redBright, yellowBright } = chalk;

const logger = {
  log: (message) => {
    console.log(greenBright("[CM42:Log]"), message);
  },
  error: (message) => {
    console.error(redBright("[CM42:Error]"), message);
  },
  warn: (message) => {
    console.warn(yellowBright("[CM42:Warn]"), message);
  },
};

export default logger;
