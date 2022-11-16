const spawn = require("child_process").spawn;

const child = spawn("ls", ["-la", "/home"]);

child.stdout.on("data", function (data) {
  console.log("stdout", data.toString());
});

child.stderr.on("data", function (data) {
  console.log("stderr", data.toString());
});

child.on("close", function (code) {
  console.log("Im done!", code);
});