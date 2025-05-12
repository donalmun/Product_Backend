module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      productVariantId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      discount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    },
    {}
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderItem.belongsTo(models.ProductVariant, {
      foreignKey: 'productVariantId',
    });
  };
  return OrderItem;
};
