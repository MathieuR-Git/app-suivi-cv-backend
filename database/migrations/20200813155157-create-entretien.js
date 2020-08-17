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
          model:'Candidature',
          key:'idUtilisateur'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      idOffre: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Candidature',
          key:'idOffre'
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Entretiens');
  }
};