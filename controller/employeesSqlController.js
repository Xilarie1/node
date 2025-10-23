const {
  addEmployee,
  getEmployeeByID,
  deleteEmployee,
} = require("../services/employeeServices");
const { getAllEmployees, updateEmployee } = require("./employeesController");

const handleAddEmployee = (req, res) => {
  const { first_name, last_name, job_title } = req.body;

  if (!first_name || !last_name || !job_title) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = addEmployee({ first_name, last_name, job_title });
    res.status(201).json({
      message: "Employee added successfully",
      employee: {
        id: result.lastInsertRowid,
        first_name,
        last_name,
        job_title,
      },
    });
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

const handleGetAllEmployees = (req, res) => {
  try {
    const employees = getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error("Database error", err.message);
    res.status(500).json({ error: "Failed to get the employees" });
  }
};

const handleGetEmployeeById = (req, res) => {
  const { id } = req.params;
  try {
    const employee = getEmployeeByID(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Database error", err.message);
    res.status(500).json({ error: "Failed to get the employee" });
  }
};

const handleUpdateEmployee = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, job_title } = req.body;

  if (!first_name || !last_name || !job_title) {
    return res.stsatus(400).json({ error: "All fields are required!" });
  }
  try {
    const result = updateEmployee(id, { first_name, last_name, job_title });

    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not updated" });
    }
    res.json({ message: "Employee information updated" });
  } catch (err) {
    console.error("Database error", err.message);
    res.status(500).json({ error: "Failed to update the employee" });
  }
};

const handleDeleteEmployee = (req, res) => {
  const { id } = req.params;
  try {
    const restult = deleteEmployee(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console, error("Database error:", err.message);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
