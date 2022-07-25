const { boot } = require('./_boot/boot');

boot().catch((error) => {
  console.error(error);
  process.exit();
});
