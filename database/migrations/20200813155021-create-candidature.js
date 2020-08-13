'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidatures', {
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
      dateCandidature: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateRelance: {
        type: Sequelize.DATE
      },
      dureeRelance: {
        type: Sequelize.INTEGER
      },
      statut: {
        allowNull: false,
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
    })
    .then(()=>{
      queryInterface.addConstraint('Candidatures',['idUtilisateur','idOffre'],{
        type:'primary key',
        name:'candidatures_pkey'
      })
    })
    ;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Candidatures');
  }
};