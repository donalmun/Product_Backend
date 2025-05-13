const db = require('../models');
const { sequelize } = db;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Payment = db.Payment;
const ProductVariant = db.ProductVariant;
const User = db.User;
const Address = db.Address;
const Inventory = db.Inventory;
const Voucher = db.Voucher;
const OrderVoucher = db.OrderVoucher;
const Fee = db.Fee;
const Discount = db.Discount;
const paymentService = require('./payment.service');
const emailService = require('./email.service');

/**
 * Class để xử lý logic nghiệp vụ liên quan đến đơn hàng
 */
class OrderService {
  /**
   * Tạo đơn hàng mới và xử lý thanh toán
   * @param {Object} orderData - Dữ liệu đơn hàng
   * @returns {Promise<Object>} Thông tin đơn hàng đã tạo
   */
  async createOrder(orderData) {
    // Sử dụng transaction để đảm bảo tính nhất quán dữ liệu
    const transaction = await sequelize.transaction();

    try {
      const {
        userId,
        addressId,
        items,
        payment,
        voucherCode,
        discountId,
        fees = [],
      } = orderData;

      // Kiểm tra người dùng và địa chỉ có tồn tại không
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const address = await Address.findByPk(addressId);
      if (!address) {
        throw new Error('Address not found');
      }

      // Kiểm tra tồn kho trước khi tạo order
      for (const item of items) {
        const inventory = await Inventory.findOne({
          where: { productVariantId: item.productVariantId },
          transaction,
        });
        if (!inventory || inventory.quantity < item.quantity) {
          throw new Error(
            `Not enough stock for productVariantId ${item.productVariantId}`
          );
        }
      }

      // Tính tổng tiền, giảm giá, voucher
      let total = 0;
      let discountAmount = 0;
      let voucherAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const { productVariantId, quantity } = item;
        const productVariant = await ProductVariant.findByPk(productVariantId, {
          include: [{ model: db.Product, as: 'Product' }],
        });
        if (!productVariant) {
          await transaction.rollback();
          throw new Error(
            `Product variant with ID ${productVariantId} not found`
          );
        }
        const price = productVariant.Product.price;
        const subtotal = price * quantity;
        total += subtotal;
        orderItems.push({
          productVariantId,
          quantity,
          price,
          discount: 0, // sẽ cập nhật nếu có discount
        });
      }

      // Áp dụng giảm giá (discount)
      if (discountId) {
        const discount = await Discount.findByPk(discountId);
        if (discount) {
          discountAmount = (total * discount.percent) / 100;
          total -= discountAmount;
        }
      }

      // Áp dụng voucher
      let voucher = null;
      if (voucherCode) {
        voucher = await Voucher.findOne({ where: { code: voucherCode } });
        if (voucher) {
          voucherAmount = (total * voucher.discountPercent) / 100;
          total -= voucherAmount;
        }
      }

      // Cộng tất cả các loại phí vào tổng tiền
      let totalFee = 0;
      for (const fee of fees) {
        totalFee += Number(fee.amount);
      }
      total += totalFee;

      // Tạo đơn hàng
      const order = await Order.create(
        {
          userId,
          addressId,
          total,
          status: 'awaiting_payment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      // Thêm các sản phẩm vào đơn hàng
      for (const item of orderItems) {
        await OrderItem.create(
          {
            orderId: order.id,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
          },
          { transaction }
        );
      }

      // Trừ tồn kho sau khi tạo order item
      for (const item of items) {
        await Inventory.decrement(
          { quantity: item.quantity },
          { where: { productVariantId: item.productVariantId }, transaction }
        );
      }

      // Lưu voucher vào OrderVoucher nếu có
      if (voucher) {
        await OrderVoucher.create(
          {
            orderId: order.id,
            voucherId: voucher.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { transaction }
        );
      }

      // Lưu từng loại phí vào Fee
      for (const fee of fees) {
        await Fee.create(
          {
            orderId: order.id,
            type: fee.type,
            amount: fee.amount,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { transaction }
        );
      }

      // Xử lý thanh toán
      const paymentResult = payment
        ? await paymentService.processPayment(
            order.id,
            payment,
            total,
            transaction
          )
        : null;

      // Nếu thanh toán thành công, cập nhật trạng thái đơn hàng
      if (paymentResult && paymentResult.status === 'completed') {
        await order.update(
          {
            status: 'processing',
            updatedAt: new Date(),
          },
          { transaction }
        );
      }

      // Commit transaction
      await transaction.commit();

      // Trả về thông tin đơn hàng đã tạo
      const createdOrder = await this.getOrderById(order.id);

      // Gửi email xác nhận đơn hàng bất đồng bộ
      setImmediate(async () => {
        try {
          const userEmail = createdOrder.User?.email;
          if (userEmail) {
            await emailService.sendOrderConfirmation(userEmail, createdOrder);
            console.log(`Order confirmation email sent to ${userEmail}`);
          }
        } catch (err) {
          console.error('Failed to send order confirmation email:', err);
        }
      });

      return createdOrder;
    } catch (error) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Lấy thông tin chi tiết đơn hàng
   * @param {number} orderId - ID của đơn hàng
   * @returns {Promise<Object>} Thông tin chi tiết đơn hàng
   */
  async getOrderById(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Address },
        {
          model: OrderItem,
          include: [
            {
              model: ProductVariant,
              include: [{ model: db.Product, as: 'Product' }],
            },
          ],
        },
        { model: Payment },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async confirmPayment(orderId, paymentData) {
    const transaction = await sequelize.transaction();
    try {
      const order = await Order.findByPk(orderId, { transaction });
      if (!order) throw new Error('Order not found');
      if (order.status !== 'awaiting_payment')
        throw new Error('Order is not awaiting payment');

      // Gọi sang PaymentService
      await paymentService.confirmPayment(order, paymentData, transaction);

      // Cập nhật trạng thái đơn hàng
      await order.update(
        {
          status: 'processing',
          updatedAt: new Date(),
        },
        { transaction }
      );

      await transaction.commit();
      return await this.getOrderById(order.id);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

module.exports = new OrderService();
