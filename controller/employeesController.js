const data = {};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getSingleEmployee = (req, res) => {
  res.json({ id: req.params.id });
};
const createNewEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    id: req.body.lastname,
  });
};

const updateEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

const deleteEmployee = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

module.exports = {
  getAllEmployees,
  getSingleEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
