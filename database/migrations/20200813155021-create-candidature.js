'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidatures', {
      idUtilisateur: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Utilisateur',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
       
      },
      idOffre: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Offre',
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
      motifRefus:{
        type:Sequelize.STRING
      },
      statut: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Candidatures');
  }
};