import { boot } from './_boot/boot';

boot().catch((error: Error) => {
  console.error(error);
  process.exit();
});
