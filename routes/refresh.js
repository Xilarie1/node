const express = require("express");
const router = express.Router();
const refreshController = require("../controller/refreshController");

router.post("/", refreshController.handleRefreshController);

module.exports = router;
