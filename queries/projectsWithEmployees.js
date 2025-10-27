const db = require("../database/database");

function getProjectsWithEmployees() {
  return db
    .prepare(
      `
        SELECT projects.project_name, projects.deadline, employees.first_name, employees.last_name
        FROM projects
        INNER JOIN employees ON projects.employee_id = employees.id;
        `
    )
    .all();
}

module.exports = getProjectsWithEmployees;
