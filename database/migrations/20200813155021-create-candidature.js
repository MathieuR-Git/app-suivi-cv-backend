'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidatures', {
      idUtilisateur: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      idOffre: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
      },
      dateCandidature: {
        type: Sequelize.DATE
      },
      dateRelance: {
        type: Sequelize.DATE
      },
      dureeRelance: {
        type: Sequelize.INTEGER
      },
      statut: {
        type: Sequelize.STRING
      },
      relance: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Candidatures');
  }
};