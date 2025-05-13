'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Giày dép',
        description: 'Các loại giày dép thời trang',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quần áo',
        description: 'Các loại quần áo nam nữ',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Phụ kiện',
        description: 'Phụ kiện thời trang',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
