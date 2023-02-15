const { Router } = require("express");

const imagesRouter = require("./images");

const router = Router();

router.use("/images", imagesRouter);

module.exports = router;
