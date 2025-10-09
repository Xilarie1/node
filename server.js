// imports
const path = require("path");
const express = require("express");

const app = express();

// Serve static files (CSS, JS, images) from the root directory
app.use(express.static(__dirname));

// Routes for HTML pages
app.get(/^\/$|\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "new-page.html"));
});

// Redirect old pages
app.get(/^\/$|\/old-page(\.html)?$/, (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/www-page.html", (req, res) => {
  res.redirect(301, "/");
});

app.get(/\/*/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

// Catch-all route for 404
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
// });

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
