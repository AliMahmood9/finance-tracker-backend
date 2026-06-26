const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getInsights } = require("../controllers/ai.controller");

router.get("/", authMiddleware, getInsights);

module.exports = router;
