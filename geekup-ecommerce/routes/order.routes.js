const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: "Quản lý đơn hàng"
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: "Tạo đơn hàng mới"
 *     tags: ["Orders"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               addressId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productVariantId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *               voucherCode:
 *                 type: string
 *               discountId:
 *                 type: integer
 *               fees:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     amount:
 *                       type: number
 *     responses:
 *       201:
 *         description: "Đơn hàng đã tạo thành công"
 *       400:
 *         description: "Lỗi dữ liệu đầu vào"
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: "Lấy thông tin chi tiết đơn hàng"
 *     tags: ["Orders"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "ID của đơn hàng"
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết đơn hàng"
 *       404:
 *         description: "Không tìm thấy đơn hàng"
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /orders/{orderId}/pay:
 *   post:
 *     summary: "Xác nhận thanh toán cho đơn hàng"
 *     tags: ["Orders"]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: "ID của đơn hàng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment:
 *                 type: object
 *                 properties:
 *                   method:
 *                     type: string
 *                   details:
 *                     type: object
 *     responses:
 *       200:
 *         description: "Đơn hàng đã xác nhận thanh toán"
 *       400:
 *         description: "Lỗi xác nhận thanh toán"
 */
router.post('/:orderId/pay', orderController.confirmPayment);

module.exports = router;
