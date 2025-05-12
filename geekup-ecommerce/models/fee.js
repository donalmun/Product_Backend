module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define(
    'Fee',
    {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    },
    {}
  );
  Fee.associate = function (models) {
    Fee.belongsTo(models.Order, { foreignKey: 'orderId' });
  };
  return Fee;
};
