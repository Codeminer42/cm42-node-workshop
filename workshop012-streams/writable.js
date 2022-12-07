const { createWriteStream } = require("fs");

const fileStream = createWriteStream("./text.txt", { highWaterMark: 10000 });

process.stdin.on("data", (line) => {
  if (!fileStream.writableNeedDrain) {
    console.log("Escrevendo...");
    fileStream.write(line.toString());
  } else {
    console.log("To cheio espera ai");
    process.stdin.pause();
  }
});

fileStream.on("drain", () => {
  process.stdin.resume();
  console.log("Manda mais");
});

process.stdin.on("close", () => {
  fileStream.end();
});

fileStream.on("finish", () => {
  console.log("Todos os dados foram escritos");
});
