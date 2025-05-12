module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define(
    'ProductVariant',
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: false },
      sku: { type: DataTypes.STRING, allowNull: true },
    },
    {}
  );
  ProductVariant.associate = function (models) {
    ProductVariant.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductVariant.hasMany(models.Inventory, {
      foreignKey: 'productVariantId',
    });
    ProductVariant.hasMany(models.OrderItem, {
      foreignKey: 'productVariantId',
    });
  };
  return ProductVariant;
};
