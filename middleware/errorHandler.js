const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
  logEvents(`${err.message}: ${err.message}`, "errLog.txt");
};

module.exports = errorHandler;
