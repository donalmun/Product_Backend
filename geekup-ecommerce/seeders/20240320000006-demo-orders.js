'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1, // assessment
        addressId: 1, // địa chỉ của assessment
        total: 980000,
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('OrderItems', [
      {
        orderId: 1,
        productVariantId: 1, // KAPPA Women's Sneakers, yellow, 36
        price: 980000,
        quantity: 1,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
