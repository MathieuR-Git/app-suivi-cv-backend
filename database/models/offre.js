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