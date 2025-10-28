const db = require("../database/database");

function getLatestProjects() {
  return db
    .prepare(
      `
        SELECT project_name, deadline
        FROM projects
        ORDER BY deadline DESC
        LIMIT 5;
        `
    )
    .all();
}

module.exports = getLatestProjects;
