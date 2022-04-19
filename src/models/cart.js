"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quality: DataTypes.INTEGER,
      image_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
