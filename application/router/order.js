var express = require("express");
var orderService = require("../../domain/services/orderService");
var auth = require("../../config/auth")
var router = express.Router();

router.post("/createOrder", auth.require, async (req, res) => {
  const orderOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    orderOps[key] = value;
  }
  try {
    const newOrder = await orderService.createOrder(orderOps);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.get("/:userId", auth.require, async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await orderService.getAllOrderOfOwner(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = router;
