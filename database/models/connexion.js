'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connexion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.connexion.belongsTo(models.Utilisateur,{
        foreignKey:{
          allowNull:false
        }
      });
    }
  };
  Connexion.init({
    idUtilisateur: DataTypes.INTEGER,
    dateConnexion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Connexion',
  });
  return Connexion;
};