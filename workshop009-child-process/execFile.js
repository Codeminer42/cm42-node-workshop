const execFile = require("child_process").execFile;

execFile("ls", ["-la", "/home"], function (err, stdout, stderr) {
  if (err) {
    throw err;
  }
  console.log(stdout);
});