import { createReadStream } from "fs";
import { resolve } from "path";
import { Transform, pipeline } from "node:stream";
import createLogParser from "./log-parser.mjs";
import Split from "stream-split";
import { createJsonFormatter } from "./game-results-json-formatter.mjs";
import { pathToFileURL } from "url";

export const parseLogFile = (outputStream, callback) => {
  const lineSplitter = new Split("\n");

  const dirname = resolve();

  const logFileReader = createReadStream(`${dirname}/parser/quake.log`, {
    encoding: "utf-8",
  });

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
    console.error('Parse is over!')
  })
}

// only run if executed, not imported
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}

