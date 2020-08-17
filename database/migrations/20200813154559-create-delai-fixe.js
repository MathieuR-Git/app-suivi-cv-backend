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
          model:'Utilisateur',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      duree: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DelaiFixes');
  }
};