const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: "Quản lý danh mục sản phẩm"
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: "Lấy tất cả danh mục sản phẩm"
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: "Danh sách danh mục sản phẩm"
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: "Lấy thông tin danh mục theo ID"
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "ID của danh mục"
 *     responses:
 *       200:
 *         description: "Thông tin danh mục"
 *       404:
 *         description: "Không tìm thấy danh mục"
 */
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
