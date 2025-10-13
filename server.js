// imports
const path = require("path");
const express = require("express");
const cors = require("cors");

// first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger);
app.use(errorHandler);
// routes
app.use("/", require("./routes/root"));

const whitelist = [
  "https://thisSiteIsAllowed.com",
  "http://127.0.0.1",
  "http://[::1]:3500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// formdata
app.use(express.urlencoded({ extended: false }));
// json
app.use(express.json());
// Serve static files (CSS, JS, images) from the root directory
app.use(express.static(path.join(__dirname, "./public")));

app.get(/\/*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404, JSON not found" });
  } else req.accepts("txt");
  {
    res.type({ error: "404, text not found" });
  }
});

// Catch-all route for 404
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
// });

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
