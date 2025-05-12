'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [
      {
        name: 'Store 1',
        address: '123 Main St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Inventories', [
      {
        storeId: 1,
        productVariantId: 1,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storeId: 1,
        productVariantId: 2,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventories', null, {});
    await queryInterface.bulkDelete('Stores', null, {});
  },
};
