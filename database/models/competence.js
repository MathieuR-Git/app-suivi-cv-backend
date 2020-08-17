'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Competence.hasMany(models.CompOff)
      // define association here
    }
  };
  Competence.init({
    intitule: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Competence',
    timestamps: false
  });
  return Competence;
};