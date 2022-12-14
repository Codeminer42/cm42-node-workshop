const { createReadStream } = require("fs");

const fileStream = createReadStream("../numbers.txt");

let fileSize = 0;

fileStream.on("data", (data) => {
  fileSize += data.length;
  console.log("partial file size:", fileSize);
});

fileStream.on("end", () => {
  console.log("total file size:", fileSize);
});

fileStream.on("error", (error) => {
  console.log("algo errado aconteceu:", error);
});
