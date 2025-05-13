const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: "Quản lý sản phẩm"
 */

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: "Tìm kiếm sản phẩm với các bộ lọc, phân trang và sắp xếp"
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: "Từ khóa tìm kiếm"
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: "Lọc theo thương hiệu"
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: "Lọc theo model"
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: "Lọc theo giới tính"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: "Giá thấp nhất"
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: "Giá cao nhất"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Số trang (mặc định: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Số sản phẩm trên một trang (mặc định: 10)"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: "Trường để sắp xếp (id, name, price, brand, createdAt)"
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         description: "Hướng sắp xếp (ASC, DESC)"
 *     responses:
 *       200:
 *         description: "Danh sách sản phẩm tìm kiếm được"
 */
router.get('/search', productController.searchProducts);

module.exports = router;
