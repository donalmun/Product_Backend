'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const orders = [];
    const orderItems = [];
    let orderIdCounter = 1;

    // 6 tháng gần nhất: userId = 1, 3
    for (let month = currentMonth - 5; month <= currentMonth; month++) {
      const safeMonth = (month + 12) % 12;
      const dateYear = month < 0 ? year - 1 : year;
      for (let userId of [1, 3]) {
        const createdAt = new Date(dateYear, safeMonth, 10, 12, 0, 0);
        const baseTotal = 980000 + safeMonth * 10000 + userId * 5000;
        orders.push({
          userId,
          addressId: userId,
          total: baseTotal,
          status: 'completed',
          createdAt,
          updatedAt: createdAt,
        });
        orderItems.push({
          orderId: orderIdCounter,
          productVariantId: 1,
          price: baseTotal,
          quantity: 1,
          discount: 0,
          createdAt,
          updatedAt: createdAt,
        });
        orderIdCounter++;
      }
    }

    // 6 tháng trước đó: userId = 2, 3, 4
    const startMonth = (currentMonth - 11 + 12) % 12;
    const endMonth = (currentMonth - 6 + 12) % 12;
    for (let i = 0; i < 6; i++) {
      const month = (startMonth + i) % 12;
      const dateYear = currentMonth - 6 - i < 0 ? year - 1 : year;
      for (let userId of [2, 3, 4]) {
        const createdAt = new Date(dateYear, month, 10, 12, 0, 0);
        const baseTotal = 900000 + month * 10000 + userId * 5000;
        orders.push({
          userId,
          addressId: userId,
          total: baseTotal,
          status: 'completed',
          createdAt,
          updatedAt: createdAt,
        });
        orderItems.push({
          orderId: orderIdCounter,
          productVariantId: 1,
          price: baseTotal,
          quantity: 1,
          discount: 0,
          createdAt,
          updatedAt: createdAt,
        });
        orderIdCounter++;
      }
    }

    await queryInterface.bulkInsert('Orders', orders);
    await queryInterface.bulkInsert('OrderItems', orderItems);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
