'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entretiens', {
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
      dateEntretien: {
        type: Sequelize.DATE
      },
      typeEntretien: {
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
    await queryInterface.dropTable('Entretiens');
  }
};