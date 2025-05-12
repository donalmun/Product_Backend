'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        userId: 1,
        province: 'Bắc Kạn',
        district: 'Ba Bể',
        commune: 'Phúc Lộc',
        address: '73 tân hoà 2',
        typeHousing: 'nhà riêng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        province: 'TP.HCM',
        district: 'Quận 1',
        commune: 'Bến Nghé',
        address: '456 Lê Lợi',
        typeHousing: 'chung cư',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  },
};
