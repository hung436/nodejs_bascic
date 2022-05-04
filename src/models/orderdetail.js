"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orderdetail.belongsTo(models.order, { foreignKey: "orderID" });
      orderdetail.belongsTo(models.product, { foreignKey: "producID" });
    }
  }
  orderdetail.init(
    {
      orderID: DataTypes.INTEGER,
      producID: DataTypes.INTEGER,
      quality: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orderdetail",
    }
  );
  return orderdetail;
};
