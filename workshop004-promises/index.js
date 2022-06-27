const { promisify } = require("util");
const fsp = require("fs/promises");

const delay = (ms = 10) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const delay2 = promisify(setTimeout);

// function main1() {
//   fsp
//     .readFile("./file", "utf-8")
//     .then((value) => {
//       return Promise.reject("motivo qualquer");
//     })
//     .then((value) => console.log("aqui não"))
//     .catch((reason) => console.log(reason))
//     .finally(() => console.log("file foi liberado"));
// }

// const json = await fetch(url).then((response) => response.json());

async function main() {
  const p1 = delay(200).then(Promise.resolve("mensagem"));
  const p3 = delay(400);
  const p4 = delay(300);

  return Promise.all([p1, p3, p4]); //400ms
} //retorna promise

console.log(main());
