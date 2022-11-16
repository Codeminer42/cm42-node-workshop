const { workerData } = require('worker_threads');

console.log('Worker');

const array = workerData;
let i = 0;

while (i < 10e7) {
  Atomics.add(array, 0, 1);
  i++;
}
