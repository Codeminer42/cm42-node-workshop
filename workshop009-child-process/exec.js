const exec = require("child_process").exec;

exec("ls -la /home", function (err, stdout, stderr) {
  if (!err) {
    console.log("stdout", stdout);
  }
  console.log("stderr", stderr);
});