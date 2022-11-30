const { createConnection } = require("net");
const { createInterface } = require("readline");

const host = process.argv[2];
const port = process.argv[3];
const name = process.argv[4];

const client = createConnection(port, host, () => {
  const handShake = { type: "handShake", name };
  client.write(JSON.stringify(handShake));

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.on("line", (input) => {
    client.write(JSON.stringify({ type: "message", message: input }));
  });

  client.on("data", (data) => {
    console.log(data.toString());
  });
});
