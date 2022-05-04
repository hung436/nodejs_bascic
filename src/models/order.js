"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.hasMany(models.orderdetail, {
        foreignKey: "orderID",
      });
    }
  }
  order.init(
    {
      userId: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      address: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
