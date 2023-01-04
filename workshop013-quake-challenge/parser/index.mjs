import { createReadStream } from "fs";
import { resolve } from "path";
import { pipeline } from "node:stream";
import logParser from "./log-parser.mjs";
import Split from "stream-split";
import gameResultsJsonFormatter from "./game-results-json-formatter.mjs";

export const lineSplitter = new Split(new Buffer.from("\n"));

export const parseLogFile = (outputStream, callback) => {
  const dirname = resolve();

  const logFileReader = createReadStream(`${dirname}/parser/quake.log`, {
    encoding: "utf-8",
  });

  pipeline(
    logFileReader,
    lineSplitter,
    logParser,
    gameResultsJsonFormatter,
    outputStream,
    callback
  );
};
