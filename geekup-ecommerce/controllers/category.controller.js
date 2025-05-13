const categoryService = require('../services/category.service');

/**
 * Get all active product categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllCategories = async (req, res) => {
  try {
    // Gọi service để lấy danh sách categories
    const categories = await categoryService.getAllActiveCategories();

    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({
      error: 'Failed to fetch categories',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

/**
 * Get category by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({
      error: 'Failed to fetch category',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
