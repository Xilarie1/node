const express = require("express");
const router = express.Router();
const path = require("path");

// Routes for HTML pages
router.get(/^\/$|\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});

router.get(/^\/$|\/new-page(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "new-page.html"));
});

// Redirect old pages
router.get(/^\/$|\/old-page(\.html)?$/, (req, res) => {
  res.redirect(301, "/new-page.html");
});

router.get("/www-page.html", (req, res) => {
  res.redirect(301, "/");
});

module.exports = router;
