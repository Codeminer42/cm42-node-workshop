import { createReadStream } from "fs";
import { resolve } from "path";
import { pipeline } from "node:stream";
import logParser from "./log-parser.mjs";
import Split from "stream-split";
import {gameResultsFormatter, jsonFormatter} from "./game-results-json-formatter.mjs";
import { pathToFileURL } from "url";

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
    gameResultsFormatter,
    jsonFormatter,
    outputStream,
    callback
  );
};

const main = () => {
  const outputStream = process.stdout;

  parseLogFile(outputStream, (error, result) => {
    if (error) {
      return console.error('Something wrong!', error);
    }
    console.error('Parse is over!')
  })
}

// only run if executed, not imported
if(import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}

