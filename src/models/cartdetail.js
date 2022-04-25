"use strict";
const { Model } = require("sequelize");
const cart = require("./cart");
module.exports = (sequelize, DataTypes) => {
  class cartdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartdetail.belongsTo(models.cart, { foreignKey: "cartID" });
      cartdetail.belongsTo(models.product, { foreignKey: "producID" });
    }
  }
  cartdetail.init(
    {
      cartID: DataTypes.INTEGER,
      producID: DataTypes.INTEGER,
      quality: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cartdetail",
    }
  );
  return cartdetail;
};
