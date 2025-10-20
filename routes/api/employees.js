const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controller/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const data = {};
data.employees = require("../../model/employees.json");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin), employeesController.createNewEmployee)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getSingleEmployee);

module.exports = router;
