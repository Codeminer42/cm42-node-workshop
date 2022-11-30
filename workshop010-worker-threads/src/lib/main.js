const { resolve } = require("path");
const { Worker } = require("worker_threads");

const main = () => {
  console.log("Main thread");

  const buffer = new SharedArrayBuffer(4);
  const array = new Uint32Array(buffer);
  array[0] = 1;

  const worker = new Worker(resolve(__dirname, "../worker"), {
    workerData: array,
  });

  worker.on("exit", () => console.log(array));

  const worker2 = new Worker(resolve(__dirname, "../worker"), {
    workerData: array,
  });

  worker2.on("exit", () => console.log(array));
};

exports.main = main;
