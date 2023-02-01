import Split from "stream-split";
import createLogParser from "./log-parser.mjs";
import { LOG_FILE } from '../lib/config.mjs';
import { Transform, pipeline } from "stream";
import { createJsonFormatter } from "./game-results-json-formatter.mjs";
import { pathToFileURL } from "url";
import { resolve } from "path";
import { spawn } from "child_process";

const createInfiniteReadStream = (fileName) => {
  const tail = spawn('tail', ['-n 0', '-f', fileName]);
  return tail.stdout;
};

export const parseLogFile = (outputStream, callback) => {
  const lineSplitter = new Split("\n");

  const logFileReader = createInfiniteReadStream(resolve(LOG_FILE));

  const logParser = createLogParser();

  pipeline(
    logFileReader,
    lineSplitter,
    logParser,
    outputStream,
    callback
  );
};

const main = () => {
  const outputStream = createJsonFormatter()
  outputStream
    .pipe(new Transform({
      transform(chunk, _encoding, callback) {
        callback(null, "\u001Bc" + chunk);
      }
    }))
    .pipe(process.stdout)

  parseLogFile(outputStream, (error) => {
    if (error) {
      return console.error('Something wrong!', error);
    }

    console.error('\n\nParse is over!')
  })
}

// only run if executed, not imported
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}

