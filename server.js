// imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");

const db = require("./database/database");

const app = express();

app.use(logger);
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
// routes
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// formdata

// json

// Serve static files (CSS, JS, images) from the root directory

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
