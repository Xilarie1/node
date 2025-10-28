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

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL,
  project_name TEXT NOT NULL,
  deadline TEXT,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
  )`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
  )
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS employee_skills(
    employee_id INTEGER NOT NULL, 
    skill_id INTEGER NOT NULL, 
    PRIMARY KEY (employee_id, skill_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY(skill_id) REFERENCES skills(id)
    )
    `
).run();

db.prepare(
  `
  CREATE INDEX IF NOT EXISTS idx_projects_employee_id
  ON projects (employee_id)
  `
).run();

db.prepare(
  `
    CREATE INDEX IF NOT EXISTS idx_employee_skills_employee_id
    ON employee_skills (employee_id)
    `
).run();

db.prepare(
  `
  CREATE INDEX IF NOT EXISTS idx_projects_project_name
  ON projects (project_name)
  `
).run();

db.prepare(
  `
  CREATE INDEX IF NOT EXISTS idx_skils_nmae
  ON skills (name)
  `
).run();

console.log("Table created");

module.exports = db;
