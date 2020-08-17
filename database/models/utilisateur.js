'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Utilisateur.hasOne(models.DelaiFixe);
      models.Utilisateur.hasMany(models.Connexion);
      models.Utilisateur.hasMany(models.Candidature,{
        foreignKey:'idUtilisateur'
      });
    }
  };
  Utilisateur.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    delaiFixe: DataTypes.BOOLEAN,
    motDePasse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Utilisateur',
    timestamps: false
  });
  return Utilisateur;
};