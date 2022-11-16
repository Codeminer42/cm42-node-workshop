const fork = require("child_process").fork;

if (process.argv[2] === "child") {
  console.log("Im the child! PID", process.pid);
  process.exit();
}

console.log("Im the parent! PID", process.pid);

fork(__filename, ["child"]);