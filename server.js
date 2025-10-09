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
const emitter = new TheEmitter();

emitter.on("log", (msg) => logEvents(msg));

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "view", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "view", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "view", req.url.replace(/^\/+/, ""))
      : path.join(__dirname, req.url.replace(/^\/+/, ""));

  // if no extension and not ending with "/", assume ".html"
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const serveFile = async (filePath, contentType, response) => {
    try {
      const rawData = await fsPromises.readFile(
        filePath,
        !contentType.includes("image") ? "utf8" : ""
      );

      const data =
        contentType === "application/json" ? JSON.parse(rawData) : rawData;

      response.writeHead(filePath.includes("404.html") ? 404 : 200, {
        "Content-Type": contentType,
      });

      response.end(
        contentType === "application/json" ? JSON.stringify(data) : data
      );
    } catch (err) {
      console.log(err);
      emitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
      response.statusCode = 500;
      response.end();
    }
  };

  if (fs.existsSync(filePath)) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "view", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
