const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
  const theLog = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(theLog);

  try {
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }
    await fsPromises.appendFile(path.join(logsDir, logName), theLog);
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  if (process.env.NODE_ENV === "development") {
    console.log(`${req.method} ${req.path}`);
  }
  next();
};

module.exports = { logEvents, logger };
