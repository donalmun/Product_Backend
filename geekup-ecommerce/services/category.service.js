const db = require('../models');
const Category = db.Category;

/**
 * Class để xử lý logic nghiệp vụ liên quan đến danh mục sản phẩm
 */
class CategoryService {
  /**
   * Lấy danh sách tất cả các danh mục sản phẩm đang active
   * @returns {Promise<Array>} Danh sách các danh mục
   */
  async getAllActiveCategories() {
    try {
      const categories = await Category.findAll({
        where: { status: 'active' },
        attributes: ['id', 'name', 'description', 'status'],
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy thông tin chi tiết của một danh mục
   * @param {number} id - ID của danh mục
   * @returns {Promise<Object>} Thông tin chi tiết danh mục
   */
  async getCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();
