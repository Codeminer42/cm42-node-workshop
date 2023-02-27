const Jimp = require("jimp");

const { images } = require("../config");

const applyImageMutation = (image, param, value) => {
  switch (param) {
    case "height":
      return image.resize(image.getWidth(), Number(value));
    case "width":
      return image.resize(Number(value), image.getHeight());
    case "blur":
      return image.blur(Number(value));
    default:
      return image;
  }
};

const setupImageProcessor = (app) => {
  app.locals.readImage = (path) =>
    Jimp.read(path).then((image) => image.getBufferAsync(image.getMIME()));

  app.locals.getImageMimeType = (imageBuffer) =>
    Jimp.read(imageBuffer).then((image) => image.getMIME());

  app.locals.processImage = async (imageBuffer, params) =>
    Jimp.read(imageBuffer).then((image) =>
      Object.entries(params)
        .reduce(
          (currentImage, [param, value]) =>
            applyImageMutation(currentImage, param, value),
          image
        )
        .getBufferAsync(image.getMIME())
    );
};

module.exports = setupImageProcessor;
