// Internal Dependencies
const jwt = require('jsonwebtoken');

// Internal Dependencies
const Category = require('../models/Category');

// Category creation
const createCategoryController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name: name.toLowerCase() });
        if (existingCategory) {
            return res.status(403).json({
                error: {
                    message: 'Category already exists.'
                }
            });
        }

        // Create a new category
        const newCategory = new Category({
            name: name.toLowerCase(),
            authorId: decoded.id,
        });

        // Save the category
        await newCategory.save();

        // Response
        res.status(201).json({ message: 'Category created successfully!' });
    } catch (error) {
        res.status(500).json({ error: { message: 'Category creation failed!' } })
    }
};

// Fetch all categories
const fetchAllCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ name: 1 });   // 1 for ascending, -1 for descending

        // Check if categories exist
        if (!categories) {
            return res.status(404).json({
                error: {
                    message: 'No categories found.'
                }
            });
        }

        // Sort categories by name
        // categories.sort((a, b) => a.name.localeCompare(b.name));

        // Response
        res.status(200).json({ categories: categories });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Failed to fetch categories!'
            }
        });
    }
};

// Fetch Single Category
const fetchSingleCategoryController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;

        // Client is admin or not
        if (decoded.role && decoded.role !== 'admin') {
            return res.status(403).json({
                error: {
                    message: 'You don\'t have permission to view this category.'
                }
            });
        }

        // Fetch the category with given ID
        const category = await Category.findById({ _id: id });

        // Check if category exists
        if (!category) {
            return res.status(404).json({
                error: {
                    message: 'Category not found.'
                }
            });
        }

        // Response
        res.status(200).json({ category: category });
    } catch (error) {
        res.status(500).json({ error: { message: 'Failed to fetch category!' } });
    }
};

// Update Category
const updateCategoryController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;
        const { name } = req.body;

        // Client is admin or not
        if (decoded.role && decoded.role !== 'admin') {
            return res.status(403).json({
                error: {
                    message: 'You don\'t have permission to update this category.'
                }
            });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ _id: id, name: name.toLowerCase() });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(403).json({
                error: {
                    message: 'Category already exists.'
                }
            });
        }

        // Updated Data
        const updatedCategoryData = {
            name: name.toLowerCase() || existingCategory.name.toLowerCase(),
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(id, updatedCategoryData, { new: true });

        // Response
        res.status(200).json({ message: 'Category updated successfully!', category: updatedCategory });
    }
    catch (error) {
        res.status(500).json({ error: { message: 'Failed to update category!' } });
    }
}

// Delete Category
const deleteCategoryController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;

        // Client is admin or not
        if (decoded.role && decoded.role !== 'admin') {
            return res.status(403).json({
                error: {
                    message: 'You don\'t have permission to delete this category.'
                }
            });
        }

        // Delete the category
        const category = await Category.findByIdAndDelete({ _id: id });

        // Check if the category is already exists
        if (!category) {
            return res.status(403).json({
                error: {
                    message: 'Category does not exist'
                }
            });
        }

        // Response
        res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: { message: 'Failed to delete category!' } });
    }
};

// Export Module
module.exports = { createCategoryController, fetchAllCategoriesController, fetchSingleCategoryController, updateCategoryController, deleteCategoryController };