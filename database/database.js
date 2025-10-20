const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "companyEmployees.sqlite");
const db = new Database(dbPath, { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS employees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    job_title TEXT NOT NULL
    )`
).run();

console.log("Table created");

module.exports = db;
