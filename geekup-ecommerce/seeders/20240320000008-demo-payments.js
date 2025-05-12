'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        orderId: 1,
        method: 'credit_card',
        status: 'paid',
        amount: 980000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Fees', [
      {
        orderId: 1,
        type: 'shipping',
        amount: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fees', null, {});
    await queryInterface.bulkDelete('Payments', null, {});
  },
};
