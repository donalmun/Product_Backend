'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        orderId: 1,
        method: 'credit_card',
        status: 'completed',
        amount: 980000,
        details: JSON.stringify({
          cardNumber: '1234567890123456',
          cardHolder: 'John Doe',
          expirationDate: '2024-12-31',
          cvv: '123',
        }),
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
