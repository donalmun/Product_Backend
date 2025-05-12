module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      addressId: { type: DataTypes.INTEGER, allowNull: false },
      total: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {}
  );
  Order.associate = function (models) {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.belongsTo(models.Address, { foreignKey: 'addressId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    Order.hasMany(models.OrderVoucher, { foreignKey: 'orderId' });
    Order.hasMany(models.Fee, { foreignKey: 'orderId' });
    Order.hasOne(models.Payment, { foreignKey: 'orderId' });
  };
  return Order;
};
