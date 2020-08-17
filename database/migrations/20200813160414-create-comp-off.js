'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompOffs', {
      
      idCompetence: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Competence',
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
      niveau: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }).then(()=>{
      queryInterface.addConstraint('CompOffs',['idCompetence','idOffre'],{
        type:'primary key',
        name:'compoff_pkey'
      })
    })
    ;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CompOffs');
  }
};