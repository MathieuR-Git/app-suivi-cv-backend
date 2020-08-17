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
        allowNull: false,
        type: Sequelize.STRING
      },
      nomEntreprise: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Offres');
  }
};