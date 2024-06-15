'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DiscussionCommentars', [
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 1,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 2,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "https://desaterbah.gunungkidulkab.go.id/assets/files/artikel/sedang_1524584096agriculture-1552375_1280-640x480.jpg",
        discussionId: 1,
        userId: 2,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 2,
      },
      {
        commentar: "Izin bertanya seputar penyakit tanaman",
        urlPhoto: "",
        discussionId: 1,
        userId: 2,
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiscussionCommentars', null, {});
    await queryInterface.sequelize.query('ALTER TABLE DiscussionCommentars AUTO_INCREMENT = 1');
  }
};
