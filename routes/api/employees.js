const express = require('express');
const path = require('path');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const ROLES = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(verifyRoles(ROLES.admin, ROLES.editer, ROLES.user), employeeController.getAllEmployees)
    .post(verifyRoles(ROLES.admin, ROLES.editer), employeeController.createNewEmployee)
    .put(verifyRoles(ROLES.admin, ROLES.editer), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES.admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);


module.exports = router;

