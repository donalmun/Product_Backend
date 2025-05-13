const db = require('../models');
const { Op, literal } = require('sequelize');
const Product = db.Product;

/**
 * Class để xử lý logic nghiệp vụ liên quan đến sản phẩm
 */
class ProductService {
  /**
   * Tìm kiếm sản phẩm với các bộ lọc
   * @param {Object} options - Các tùy chọn tìm kiếm
   * @param {Object} options.filters - Các bộ lọc (q, brand, model, gender, minPrice, maxPrice)
   * @param {Object} options.pagination - Thông tin phân trang (page, limit)
   * @param {Object} options.sort - Thông tin sắp xếp (sortBy, sortDirection)
   * @returns {Promise<Object>} Kết quả tìm kiếm với thông tin phân trang
   */
  async searchProducts(options) {
    try {
      const { filters, pagination, sort } = options;
      const { q, brand, model, gender, minPrice, maxPrice } = filters || {};
      const { page = 1, limit = 10 } = pagination || {};
      const { sortBy = 'id', sortDirection = 'ASC' } = sort || {};

      // Xây dựng điều kiện tìm kiếm
      const where = {};

      // Tìm kiếm theo từ khóa (cải thiện full-text search)
      if (q) {
        // Sử dụng kết hợp cả LIKE và relevance score
        const searchTerms = q.split(' ').filter((term) => term.length > 0);

        if (searchTerms.length > 0) {
          const searchConditions = [];

          // Tìm theo tên và mô tả
          searchConditions.push({ name: { [Op.like]: `%${q}%` } });
          searchConditions.push({ description: { [Op.like]: `%${q}%` } });

          // Tìm theo từng từ khóa riêng lẻ cho kết quả tốt hơn
          if (searchTerms.length > 1) {
            searchTerms.forEach((term) => {
              searchConditions.push({ name: { [Op.like]: `%${term}%` } });
              searchConditions.push({
                description: { [Op.like]: `%${term}%` },
              });
            });
          }

          where[Op.or] = searchConditions;
        }
      }

      // Lọc theo thương hiệu
      if (brand) {
        where.brand = brand;
      }

      // Lọc theo model
      if (model) {
        where.model = model;
      }

      // Lọc theo giới tính
      if (gender) {
        where.gender = gender;
      }

      // Lọc theo khoảng giá
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = minPrice;
        if (maxPrice) where.price[Op.lte] = maxPrice;
      }

      // Tính toán offset dựa trên page và limit
      const offset = (page - 1) * limit;

      // Kiểm tra và xác thực trường sắp xếp
      const validSortFields = ['id', 'name', 'price', 'brand', 'createdAt'];
      const validSortField = validSortFields.includes(sortBy) ? sortBy : 'id';

      // Kiểm tra và xác thực hướng sắp xếp
      const validSortDirection = ['ASC', 'DESC'].includes(
        sortDirection.toUpperCase()
      )
        ? sortDirection.toUpperCase()
        : 'ASC';

      // Thực hiện truy vấn với phân trang và sắp xếp
      const { count, rows: products } = await Product.findAndCountAll({
        where,
        attributes: [
          'id',
          'name',
          'description',
          'price',
          'model',
          'brand',
          'gender',
          'categoryId',
          'createdAt',
          'updatedAt',
        ],
        order: [[validSortField, validSortDirection]],
        limit: limit,
        offset: offset,
      });

      // Tính toán thông tin phân trang
      const totalPages = Math.ceil(count / limit);

      // Trả về kết quả với metadata phân trang
      return {
        data: products,
        pagination: {
          total: count,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
        },
        filters: { q, brand, model, gender, minPrice, maxPrice },
        sort: { sortBy: validSortField, sortDirection: validSortDirection },
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
