'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     models.Candidature.hasOne(models.Entretien);
      models.Candidature.belongsTo(models.Offre,{
        foreignKey:{
          allowNull:false
        }
      });
      models.Candidature.belongsTo(models.Utilisateur,{
        foreignKey:{
          allowNull:false
        }
      });
    }
  };
  Candidature.init({
    idUtilisateur: DataTypes.INTEGER,
    idOffre: DataTypes.STRING,
    dateCandidature: DataTypes.DATE,
    dateRelance: DataTypes.DATE,
    dureeRelance: DataTypes.INTEGER,
    statut: DataTypes.STRING,
    relance: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Candidature',
  });
  return Candidature;
};