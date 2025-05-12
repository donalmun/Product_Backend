'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Giày dép',
        description: 'Các loại giày dép thời trang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quần áo',
        description: 'Các loại quần áo nam nữ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Phụ kiện',
        description: 'Phụ kiện thời trang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
