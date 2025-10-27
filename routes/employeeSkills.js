const express = require("express");
const router = express.Router();
const getEmployeesWithSkills = require("../queries/employeesWithSkills");

router.get("/", (req, res) => {
  const data = getEmployeesWithSkills();
  res.json(data);
});

module.exports = router;
