'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Offre.hasMany(models.Candidature,{
        foreignKey:"idOffre"
      });
      models.Offre.hasMany(models.CompOff);
    }
  };
  Offre.init({
    poste: DataTypes.STRING,
    nomEntreprise: DataTypes.STRING,
    url: DataTypes.STRING,
    nomContact: DataTypes.STRING,
    fonctionContact: DataTypes.STRING,
    telContact: DataTypes.STRING,
    emailContact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offre',
    timestamps: false
  });
  return Offre;
};