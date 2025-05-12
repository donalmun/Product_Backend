module.exports = (sequelize, DataTypes) => {
  const OrderVoucher = sequelize.define(
    'OrderVoucher',
    {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      voucherId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  OrderVoucher.associate = function (models) {
    OrderVoucher.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderVoucher.belongsTo(models.Voucher, { foreignKey: 'voucherId' });
  };
  return OrderVoucher;
};
