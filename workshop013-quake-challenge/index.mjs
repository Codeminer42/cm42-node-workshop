import { createReadStream } from "fs";
import { resolve } from "path";
import transformStream from "./transform-stream.mjs";
import Split from "stream-split";

const splitter = new Split(new Buffer.from("\n"));

const main = () => {
  const dirname = resolve();

  const readStream = createReadStream(`${dirname}/quake.log`, {
    encoding: "utf-8",
  });

  readStream
    .pipe(splitter)
    .pipe(transformStream)
    .pipe(process.stdout);
};

main();
