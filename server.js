// imports
const path = require("path");
const express = require("express");

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Goodbye world!");
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
