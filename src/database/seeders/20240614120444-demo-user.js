'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Doe',
        email: 'example@example.com',
        password: bcrypt.hashSync("Password123", bcrypt.genSaltSync(10)),
        gender: 'Laki-Laki',
        age: 22,
        city: 'Wonosobo',
        province: 'Jawa Tengah',
        verified: true,
        role: 'user',
        photoProfile: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doe',
        email: 'example2@example.com',
        password: bcrypt.hashSync("Password123", bcrypt.genSaltSync(10)),
        gender: 'Laki-Laki',
        age: 22,
        city: 'Wonosobo',
        province: 'Jawa Tengah',
        verified: true,
        role: 'user',
        photoProfile: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync("Password123", bcrypt.genSaltSync(10)),
        gender: 'Laki-Laki',
        age: 22,
        city: 'Wonosobo',
        province: 'Jawa Tengah',
        verified: true,
        role: 'user',
        photoProfile: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1');
  }
};
