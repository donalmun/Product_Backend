const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * @route GET /products/search
 * @desc Tìm kiếm sản phẩm với các bộ lọc, phân trang và sắp xếp
 * @access Public
 *
 * @query q - Từ khóa tìm kiếm
 * @query brand - Lọc theo thương hiệu
 * @query model - Lọc theo model
 * @query gender - Lọc theo giới tính
 * @query minPrice - Giá thấp nhất
 * @query maxPrice - Giá cao nhất
 * @query page - Số trang (mặc định: 1)
 * @query limit - Số sản phẩm trên một trang (mặc định: 10)
 * @query sortBy - Trường để sắp xếp (id, name, price, brand, createdAt)
 * @query sortDirection - Hướng sắp xếp (ASC, DESC)
 *
 * @returns {Object} - Đối tượng chứa danh sách sản phẩm (data), thông tin phân trang (pagination),
 *                    thông tin bộ lọc (filters) và thông tin sắp xếp (sort)
 */
router.get('/search', productController.searchProducts);

module.exports = router;
