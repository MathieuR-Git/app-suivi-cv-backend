'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DelaiFixe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DelaiFixe.init({
    idUtilisateur: DataTypes.INTEGER,
    duree: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DelaiFixe',
  });
  return DelaiFixe;
};