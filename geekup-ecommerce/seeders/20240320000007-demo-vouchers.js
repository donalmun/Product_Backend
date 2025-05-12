'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vouchers', [
      {
        code: 'DISCOUNT10',
        description: 'Giảm 10% cho đơn hàng đầu tiên',
        discountPercent: 10,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('UserVouchers', [
      {
        userId: 1, // assessment
        voucherId: 1,
        used: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserVouchers', null, {});
    await queryInterface.bulkDelete('Vouchers', null, {});
  },
};
