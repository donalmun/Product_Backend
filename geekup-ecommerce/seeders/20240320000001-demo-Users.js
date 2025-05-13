'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'assessment',
        email: 'gu@gmail.com',
        phone: '328355333',
        password: null,
        type: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin',
        email: 'admin@example.com',
        phone: '0123456788',
        password: null,
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customer1',
        email: 'nhatminh9704@gmail.com',
        phone: '0123456786',
        password: null,
        type: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customer2',
        email: 'customer2@example.com',
        phone: '0123456787',
        password: null,
        type: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
