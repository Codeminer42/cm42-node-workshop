const { createConnection } = require("net");
const { createInterface } = require("readline");

const host = process.argv[2];
const port = process.argv[3];

const client = createConnection(port, host, () => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.on("line", (input) => {
    client.write(input);
  });

  client.on("data", (data) => {
    console.log(data.toString());
  });
});
