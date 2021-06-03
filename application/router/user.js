var express = require("express");
var userService = require("../../domain/services/userService");
var auth = require("../../config/auth")
var router = express.Router();

router.get("/", auth.require, async (req, res) => {
  const { offset, limit } = req.query
  try {
    const result = await userService.getAllUser(offset, limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

router.post("/createUser", auth.require, async (req, res) => {
  const userOps = {}
  for (const [key, value] of Object.entries(req.body)) {
    userOps[key] = value
  }
  try {
    const newUser = await userService.createUser(userOps);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.post("/update/:userId", auth.require, async (req, res) => {
  const { userId } = req.params;
  const updateOps = {}
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value
  }
  try {
    const updatedUser = await userService.updateUser(userId, updateOps);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.delete("/delete/:userId", auth.require, async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

router.get("/:userId", auth.require, async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await userService.getUser(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = router;
