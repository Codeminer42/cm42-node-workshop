const { createWriteStream } = require("fs");
const { Transform } = require("stream");

const fileStream = createWriteStream("./log.txt");

// HTTP/1.1 404 Not Found
// { timestamp: '2022-11-11T00:00:00', version: 'HTTP/1.1', statusCode: '404' }

const jsonFormatter = new Transform({
  defaultEncoding: "ascii",
  transform(data, _encoding, callback) {
    const [version, statusCode] = data.toString().split(" ");
    callback(
      null,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        version,
        statusCode,
      })
    );
  },
});

process.stdin.pipe(jsonFormatter).pipe(fileStream);
