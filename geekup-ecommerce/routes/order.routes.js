const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

/**
 * @route POST /orders
 * @desc Tạo đơn hàng mới và xử lý thanh toán
 * @access Private
 * @body {Object} userId - ID của người dùng
 * @body {Object} addressId - ID của địa chỉ giao hàng
 * @body {Array} items - Danh sách sản phẩm trong đơn hàng
 * @body {Object} payment - Thông tin thanh toán
 * @returns {Object} - Thông tin đơn hàng đã tạo
 */
router.post('/', orderController.createOrder);

/**
 * @route GET /orders/:id
 * @desc Lấy thông tin chi tiết đơn hàng
 * @access Private
 * @param {Object} id - ID của đơn hàng
 * @returns {Object} - Thông tin chi tiết đơn hàng
 */
router.get('/:id', orderController.getOrderById);

/**
 * @route POST /orders/:orderId/pay
 * @desc Xác nhận thanh toán cho đơn hàng
 * @access Private
 * @param {Object} orderId - ID của đơn hàng
 * @returns {Object} - Thông tin đơn hàng đã xác nhận thanh toán
 */
router.post('/:orderId/pay', orderController.confirmPayment);

module.exports = router;
