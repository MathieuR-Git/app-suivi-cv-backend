'use strict';

const utilisateur = require("../models/utilisateur");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DelaiFixes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUtilisateur: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'utilisateur',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      duree: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('DelaiFixes');
  }
};