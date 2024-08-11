// External Dependencies
const express = require('express');

// Internal Dependencies
const { createUserController, loginUserController, logoutUserController, fetchAllUsersController, fetchSingleUsersController, updateUsersController, deleteUsersController } = require('../../controllers/users.controller');
const validateUser = require('../../middlewares/validation/users/users.validator');
const { userRegistrationSchema, userLogginSchema } = require('../../middlewares/validation/users/validationSchema');
const isAdmin = require('../../middlewares/authentication/isAdmin.auth');
const { checkAuth } = require('../../middlewares/authentication/check.auth');

// Instace Variables
const userRouter = express.Router();

// Routes
userRouter.post('/registration', validateUser(userRegistrationSchema), createUserController)
userRouter.post('/login', validateUser(userLogginSchema), loginUserController)
userRouter.get('/', checkAuth, isAdmin, fetchAllUsersController)
userRouter.delete('/', logoutUserController)
userRouter.get('/:id', checkAuth, isAdmin, fetchSingleUsersController)
userRouter.put('/:id', checkAuth, updateUsersController)
userRouter.delete('/:id', checkAuth, deleteUsersController)

// Export Routes
module.exports = userRouter;