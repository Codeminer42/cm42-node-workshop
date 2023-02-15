const { join } = require("path");
const { existsSync } = require("fs");

const multer = require("multer");
const { Router } = require("express");
const asyncHandler = require("express-async-handler");

const { images } = require("../config");

const imagesRouter = Router();

imagesRouter.get(
  "/:imageName",
  asyncHandler(async (req, res) => {
    const { readImage, processImage } = req.app.locals;
    const { imageName } = req.params;

    console.time(`Execution time (${req.url})`);

    const imagePath = join(images.storagePath, imageName);

    if (!existsSync(imagePath)) return res.sendStatus(404);

    const image = await readImage(imagePath);

    const processedImage = await processImage(image, req.query);

    console.timeEnd(`Execution time (${req.url})`);

    res.setHeader("Content-Type", images.mimeType).send(processedImage);
  })
);

const upload = multer({
  storage: multer.diskStorage({
    destination: images.storagePath,
    filename: (_, file, cb) => cb(null, file.originalname),
  }),
});

imagesRouter.post("/", upload.single("image"), (_, res) =>
  res.status(200).end()
);

module.exports = imagesRouter;
