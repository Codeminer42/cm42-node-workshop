const { Worker } = require('worker_threads');

console.log('Main thread');

const buffer = new SharedArrayBuffer(4);
const array = new Uint32Array(buffer);
array[0] = 1;

const worker = new Worker('./workshop010-worker-threads/worker', {
  workerData: array
});

worker.on('exit', () => console.log(array));

const worker2 = new Worker('./workshop010-worker-threads/worker', {
  workerData: array
});

worker2.on('exit', () => console.log(array));