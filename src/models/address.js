"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      address.belongsTo(models.user, {
        foreignKey: "userID",
      });
    }
  }
  address.init(
    {
      userID: DataTypes.INTEGER,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      street_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "address",
    }
  );
  return address;
};
