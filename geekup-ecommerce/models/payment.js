module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      method: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    },
    {}
  );
  Payment.associate = function (models) {
    Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
  };
  return Payment;
};
