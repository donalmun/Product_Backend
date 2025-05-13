const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

/**
 * @route GET /categories
 * @desc Get all active categories
 * @access Public
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route GET /categories/:id
 * @desc Get category by ID
 * @access Public
 */
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
