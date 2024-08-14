// External Dependencies
const express = require('express');

// Internal Dependencies
const { createCategoryController, fetchAllCategoriesController, fetchSingleCategoryController, updateCategoryController, deleteCategoryController } = require('../../controllers/categories.controller');
const { checkAuth } = require('../../middlewares/authentication/check.auth');
const isAdmin = require('../../middlewares/authentication/isAdmin.auth');
const validateSchema = require('../../middlewares/validation/validator');
const { categorySchema } = require('../../middlewares/validation/categories/categories.validationSchema');


// Instance Variables
const categoryRouter = express.Router();

// Routes
categoryRouter.post('/', checkAuth, isAdmin, validateSchema(categorySchema), createCategoryController);
categoryRouter.get('/', checkAuth, isAdmin, fetchAllCategoriesController);
categoryRouter.get('/:id', checkAuth, isAdmin, fetchSingleCategoryController);
categoryRouter.put('/:id', checkAuth, isAdmin, validateSchema(categorySchema), updateCategoryController);
categoryRouter.delete('/:id', checkAuth, isAdmin, deleteCategoryController);

// Export Routes
module.exports = categoryRouter;