'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompOffs', {
      
      idCompetence: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      idOffre: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
      },
      niveau: {
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
    await queryInterface.dropTable('CompOffs');
  }
};