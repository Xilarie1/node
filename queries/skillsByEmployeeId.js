const db = require("../database/database");

function getSkillsByEmployeeId(employeeId) {
  return `
    SELECT skills.name AS skill
    FROM employee_skills 
    INNER JOIN skills ON employee_skills.skill_id = skills.id
    WHERE employee_skills.employee_id = ?;
    `.all(employeeId);
}

module.exports = getSkillsByEmployeeId;
