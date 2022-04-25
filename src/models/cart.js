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
      cart.hasMany(models.cartdetail, {
        foreignKey: "cartID",
      });
      cart.belongsTo(models.address, { foreignKey: "address_id" });
    }
  }
  cart.init(
    {
      userId: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
