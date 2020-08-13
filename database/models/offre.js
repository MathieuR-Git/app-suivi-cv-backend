'use strict';
const {
  Model
} = require('sequelize');
const candidature = require('./candidature');
module.exports = (sequelize, DataTypes) => {
  class Offre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.offre.hasMany(models.candidature);
      models.offre.hasMany(models.compoff);
    }
  };
  Offre.init({
    id: DataTypes.STRING,
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
  });
  return Offre;
};