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
        foreignKey:'idOffre'
      });
      models.Candidature.belongsTo(models.Utilisateur,{
        foreignKey:"idUtilisateur"
      });
    }
  };
  Candidature.init({
    idUtilisateur:{ 
      type: DataTypes.INTEGER,
    primaryKey:true},
    idOffre: {type:DataTypes.STRING,
    primaryKey:true},
    dateCandidature: DataTypes.DATE,
    dateRelance: DataTypes.DATE,
    dureeRelance: DataTypes.INTEGER,
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Candidature',
    timestamps: false,

  });
Candidature.removeAttribute("id");
  return Candidature;
};