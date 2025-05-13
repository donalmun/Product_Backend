const db = require('../models');
const Payment = db.Payment;

class PaymentService {
  async processPayment(orderId, paymentData, amount, transaction) {
    try {
      const { method, details } = paymentData;
      // Trong thực tế, đây là nơi tích hợp với cổng thanh toán
      // Hiện tại, mock logic thanh toán thành công
      if (details) {
        console.log(`Payment details for order ${orderId}:`, details);
      }
      const payment = await Payment.create(
        {
          orderId,
          method,
          amount,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );
      return {
        id: payment.id,
        status: payment.status,
        message: 'Payment processed successfully',
      };
    } catch (error) {
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }

  async confirmPayment(order, paymentData, transaction) {
    // Tạo bản ghi Payment (giả lập thành công)
    const payment = await Payment.create(
      {
        orderId: order.id,
        method: paymentData.method,
        amount: order.total,
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction }
    );
    return payment;
  }
}

module.exports = new PaymentService();
