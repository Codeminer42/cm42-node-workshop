const { join } = require("path");
const { existsSync } = require("fs");

const multer = require("multer");
const { Router } = require("express");
const asyncHandler = require("express-async-handler");

const { images } = require("../config");

const imagesRouter = Router();

imagesRouter.get(
  "/:imageName",
  (req, res, next) => {
    const { logger } = req.app.locals;

    const executionStart = performance.now();

    res.locals.printExecutionTime = () =>
      logger.debug(
        `Execution time (${req.url}): ${performance.now() - executionStart} ms`
      );

    next();
  },
  asyncHandler(async (req, res) => {
    const { imageName } = req.params;

    const {
      readImage,
      processImage,
      cacheImage,
      getCachedImage,
      getImageMimeType,
    } = req.app.locals;

    const { printExecutionTime } = res.locals;

    const cachedImage = await getCachedImage({ url: req.url });

    if (cachedImage) {
      printExecutionTime();

      return res
        .setHeader("Content-Type", await getImageMimeType(cachedImage))
        .send(cachedImage);
    }

    const imagePath = join(images.storagePath, imageName);

    if (!existsSync(imagePath)) return res.sendStatus(404);

    const image = await readImage(imagePath);

    const processedImage = await processImage(image, req.query);

    cacheImage({ url: req.url, image: processedImage });

    printExecutionTime();

    res
      .setHeader("Content-Type", await getImageMimeType(processedImage))
      .send(processedImage);
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
