'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: "KAPPA Women's Sneakers",
        categoryId: 2,
        price: 980000,
        description: 'Sneaker nữ màu vàng',
        model: '32185JW',
        brand: 'KAPPA',
        gender: 'Nữ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Áo thun nam',
        categoryId: 2,
        price: 200000,
        description: 'Áo thun cotton nam',
        model: 'TSHIRT2024',
        brand: 'Coolmate',
        gender: 'Nam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('ProductVariants', [
      {
        productId: 1,
        color: 'yellow',
        size: '36',
        sku: 'KAPPA-36-YELLOW',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        color: 'white',
        size: 'L',
        sku: 'TSHIRT-L-WHITE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductVariants', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  },
};
