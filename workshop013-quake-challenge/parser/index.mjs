import { createReadStream } from "fs";
import { resolve } from "path";
import { pipeline } from "node:stream";
import transformStream from "./transform-stream.mjs";
import Split from "stream-split";
import gameStateFormatStream from "./game-state-formatter-stream.mjs";

export const splitter = new Split(new Buffer.from("\n"));

export const parser = (outputStream, callback) => {
  const dirname = resolve();

  const readStream = createReadStream(`${dirname}/parser/quake.log`, {
    encoding: "utf-8",
  });

  pipeline(
    readStream,
    splitter,
    transformStream,
    gameStateFormatStream,
    outputStream,
    callback
  );
};
