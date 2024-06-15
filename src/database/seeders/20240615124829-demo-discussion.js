'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Discussions', [
      {
        title: "Discusion 1",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 1
      },
      {
        title: "Discusion 2",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 2
      },
      {
        title: "Discusion 3",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 1
      },
      {
        title: "Discusion 4",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 2
      },
      {
        title: "Discusion 5",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 1
      },
      {
        title: "Discusion 6",
        question: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://pertanian.ngawikab.go.id/wp-content/uploads/2023/01/Hamabakteripadi.jpg",
        userId: 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discussions', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Discussions AUTO_INCREMENT = 1');
  }
};
