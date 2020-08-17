'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entretien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     models.Entretien.belongsTo(models.Candidature,{
        foreignKey:{
          allowNull:false,

        }
      });
    }
  };
  Entretien.init({
    idUtilisateur: DataTypes.INTEGER,
    idOffre: DataTypes.STRING,
    dateEntretien: DataTypes.DATE,
    typeEntretien: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entretien',
  });
  return Entretien;
};