// const fs = require("fs");
const fsp = require("fs/promises");

console.log("inicio");

//const file = fs.readFileSync("./file");
//console.log(file.toString());

// fs.readFile("./file", (err, file) => {
//   if (err) {
//     return console.error(err);
//   }

//   console.log(file.toString());
// });

// fsp
// .readFile("./file")
// .then((file) => {
//   console.log(file.toString());
// })
// .catch((err) => {
//   console.error(err);
// });

async function main() {
  try {
    const file = await fsp.readFile("./file");
    return file.toString();
  } catch (err) {
    console.error(err);
  }
}

await main().then(console.log);

console.log("fim");
