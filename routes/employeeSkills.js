const express = require("express");
const router = express.Router();
const getEmployeesWithSkills = require("../queries/employeesWithSkills");
const getSkillsByEmployeeId = require("../queries/skillsByEmployeeId");

router.get("/", (req, res) => {
  const data = getEmployeesWithSkills();
  res.json(data);
});

router.get("/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const data = getSkillsByEmployeeId(employeeId);
  res.json(data);
});

module.exports = router;
