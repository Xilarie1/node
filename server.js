// fileOps();

// first party
const logEvents = require("./logEvents");
// third party
const EventEmitter = require("events");
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// emitter creation
class TheEmitter extends EventEmitter {}
const emittter = new TheEmitter();

emittter.on("log", (msg) => logEvents(msg));

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, respons) => {
  console.log(req.url, req.method);

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpeg":
      contentType = "image/jpg";
      break;
    case ".jpeg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "view", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "view", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "view", req.url)
      : path.join(__dirname, req.url);
  if (!extension && req.url.slice(-1) !== "/") filepath += ".html";
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
