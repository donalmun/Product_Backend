const orderService = require('../services/order.service');

/**
 * Tạo đơn hàng mới và xử lý thanh toán
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createOrder = async (req, res) => {
  try {
    // Lấy dữ liệu đơn hàng từ request body
    const orderData = req.body;

    // Validate dữ liệu đầu vào
    if (!orderData.userId || !orderData.addressId || !orderData.items) {
      return res.status(400).json({
        error: 'Missing required fields',
        requiredFields: ['userId', 'addressId', 'items'],
      });
    }

    // Kiểm tra danh sách sản phẩm
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({
        error: 'Items must be a non-empty array',
      });
    }

    // Validate từng item trong danh sách
    for (const item of orderData.items) {
      if (!item.productVariantId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          error:
            'Each item must have a valid productVariantId and a positive quantity',
        });
      }
    }

    // Gọi service để tạo đơn hàng (không cần payment)
    const order = await orderService.createOrder(orderData);

    // Trả về kết quả với status code 201 (Created)
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        userId: order.userId,
        addressId: order.addressId,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.OrderItems?.map((item) => ({
          id: item.id,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    });
  } catch (err) {
    console.error('Error creating order:', err);

    // Xử lý các loại lỗi cụ thể
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message });
    }

    res.status(500).json({
      error: 'Failed to create order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

/**
 * Lấy thông tin chi tiết đơn hàng
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);

    if (err.message === 'Order not found') {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(500).json({
      error: 'Failed to fetch order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const paymentData = req.body.payment || { method: 'mock', details: {} };

    const result = await orderService.confirmPayment(orderId, paymentData);

    res.json({
      message: 'Payment confirmed (mock)',
      order: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
