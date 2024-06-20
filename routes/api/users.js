const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');
const ROLES = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES.admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES.admin), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES.admin), usersController.getUser);

module.exports = router;