import { resolve } from "path";
import { test, expect, describe } from "vitest";
import { Worker } from "worker_threads";

import { makeCreateWorker } from "./worker";

const runWorker = (workerData) =>
  new Promise((resolvePromise) => {
    const worker = new Worker(resolve(__dirname, "../worker"), {
      workerData,
    });

    worker.on("exit", () => resolvePromise());
  });

describe("src/lib/worker", () => {
  describe("createWorker", () => {
    test("should increment value until 100000000", () => {
      const buffer = new SharedArrayBuffer(4);
      const array = new Uint32Array(buffer);
      array[0] = 0;

      makeCreateWorker(array)();

      expect(array[0]).toEqual(100000000);
    });

    test("should return correct value running 6 workers", async () => {
      const buffer = new SharedArrayBuffer(4);
      const array = new Uint32Array(buffer);
      array[0] = 0;

      await Promise.all([
        runWorker(array),
        runWorker(array),
        runWorker(array),
        runWorker(array),
        runWorker(array),
        runWorker(array),
      ]);

      expect(array[0]).toEqual(600000000);
    });
  });
});
