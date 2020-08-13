'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entretiens', {
      idEntretien: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUtilisateur: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'utilisateur',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      idOffre: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'offre',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      dateEntretien: {
        allowNull: false,
        type: Sequelize.DATE
      },
      typeEntretien: {
        allowNull: false,
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