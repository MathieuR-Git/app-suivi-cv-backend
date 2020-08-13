'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Offres', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      poste: {
        type: Sequelize.STRING
      },
      nomEntreprise: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      nomContact: {
        type: Sequelize.STRING
      },
      fonctionContact: {
        type: Sequelize.STRING
      },
      telContact: {
        type: Sequelize.STRING
      },
      emailContact: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Offres');
  }
};