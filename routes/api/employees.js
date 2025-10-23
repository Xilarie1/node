const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controller/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
  handleUpdateEmployee,
  handleDeleteEmployee,
} = require("../../controller/employeesSqlController");

router.post("./addEmployee", handleAddEmployee);
router.get("/", handleGetAllEmployees);
router.get(":id", handleGetEmployeeById);
router.put("/:id", handleUpdateEmployee);
router.delete("/:id", handleDeleteEmployee);

// const data = {};
// data.employees = require("../../model/employees.json");

// router
//   .route("/")
//   .get(employeesController.getAllEmployees)
//   .post(verifyRoles(ROLES_LIST.Admin), employeesController.createNewEmployee)
//   .put(
//     verifyRoles(ROLES_LIST.Admin, ROLES_LIST.editor),
//     employeesController.updateEmployee
//   )
//   .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

// router.route("/:id").get(employeesController.getSingleEmployee);

module.exports = router;
