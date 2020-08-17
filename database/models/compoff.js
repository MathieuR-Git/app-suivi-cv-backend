'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompOff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.CompOff.belongsTo(models.Offre,{
        foreignKey:{
          allowNull:false
        }
      });
      models.CompOff.belongsTo(models.Competence,{
        foreignKey:{
          allowNull:false
        }
      });
    }
  };
  CompOff.init({
    idCompetence: DataTypes.INTEGER,
    idOffre: DataTypes.STRING,
    niveau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompOff',
  });
  return CompOff;
};