// imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

// first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");

const db = require("./database/database");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
app.use("/logout", require("./routes/logout"));

//app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/chat", require("./routes/chat"));
app.use("/projects", require("./routes/projects"));
app.use("/skills", require("./routes/employeeSkills"));

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
    res.type("text").send("404, text not found");
  }
});

// Catch-all route for 404
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
// });
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log("Token received:", token);
//   if (!token) {
//     return next(new Error("Authentication error: No token provided"));
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     socket.user = decoded;
//     next();
//   } catch (err) {
//     return next(new Error("Authentication error: Invalid token"));
//   }
// });

io.on("connection", (socket) => {
  socket.on("chatMessage", (msg) => {
    console.log("received chat message from server", msg);
    const user = socket.user?.username || "Anonymous";
    console.log("Message received: ", msg);
    io.emit("chatMessage", { user, message: msg });
  });
  socket.on("sendNotification", (msg) => {
    io.emit("notification", msg);
  });
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGINT", () => {
  try {
    db.close();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Failed to close database connection", err.message);
  } finally {
    process.exit(0);
  }
});
