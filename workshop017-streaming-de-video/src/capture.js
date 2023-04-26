const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const manifestPath = path.join(
  __dirname,
  "..",
  "storage",
  "live",
  "stream.m3u8"
);

const command = ffmpeg()
  .input("/dev/video0")
  .inputOptions("-f video4linux2")
  .videoCodec("libx264")
  .videoBitrate("800k")
  .addOption("-pix_fmt", "yuv420p")
  .output(manifestPath)
  .outputOptions("-f hls");

command.on("stderr", console.error);
command.run();
