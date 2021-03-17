var express = require("express");
var router = express.Router();

var userRouter = require("./user");
var productRouter = require("./product");
var authRouter = require("./auth");

router.use("/auth", authRouter);
router.use("/user", userRouter)
router.use("/product", productRouter)

module.exports = router;