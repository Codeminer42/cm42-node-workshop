const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();

router.get("/live", (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "live.html");
  res.sendFile(filePath);
});

router.get("/watch/live/:manifest.m3u8", (req, res) => {
  const manifestFile = req.params.manifest.concat(".m3u8");
  const manifestPath = path.join(
    __dirname,
    "..",
    "storage",
    "live",
    manifestFile
  );

  res
    .setHeader("Content-Type", "application/vnd.apple.mpegurl")
    .sendFile(manifestPath);
});

router.get("/watch/live/:segment.ts", (req, res) => {
  const segmentFile = req.params.segment.concat(".ts");
  const segmentPath = path.join(
    __dirname,
    "..",
    "storage",
    "live",
    segmentFile
  );

  res.setHeader("Content-Type", "video/mp2t").sendFile(segmentPath);
});

router.get("/watch/:videoName", (req, res) => {
  const videoName = req.params.videoName;
  const page = fs
    .readFileSync(path.join(__dirname, "..", "public", "watch.html"), "utf-8")
    .replace("{{videoUrl}}", `/stream/${videoName}`);
  res.send(page);
});

router.get("/stream/:videoName", (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(__dirname, "..", "storage", videoName);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send("Video not found");
  }

  const videoSize = fs.statSync(videoPath).size;

  const range = req.headers.range;
  const start = range ? Number(range.replace("bytes=", "").split("-")[0]) : 0;
  const end = Math.min(start + 1e6, videoSize);

  if (start >= videoSize) {
    return res.status(416).setHeader("Content-Range", `bytes */${videoSize}`).end();
  }

  res.status(206).set({
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  });

  fs.createReadStream(videoPath, { start, end }).pipe(res);
});

module.exports = router;
