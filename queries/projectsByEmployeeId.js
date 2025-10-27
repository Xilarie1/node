const db = require("../database/database");

function getProjectsByEmployeeId(employeeId) {
  return db
    .prepare(
      `
        SELECT project_name, deadline
        FROM projectse
        WHERE employee_id = ?;
        `
    )
    .all(employeeId);
}

module.exports = getProjectsByEmployeeId;
