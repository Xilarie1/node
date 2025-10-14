// imports
const path = require("path");
const express = require("express");
const cors = require("cors");

// first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const app = express();

app.use(logger);
app.use(errorHandler);
app.use(express.json());
// routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));

app.use(cors(corsOptions));

// formdata
app.use(express.urlencoded({ extended: false }));
// json

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
