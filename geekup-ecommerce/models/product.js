module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.hasMany(models.ProductVariant, { foreignKey: 'productId' });
    Product.hasMany(models.Discount, { foreignKey: 'productId' });
  };
  return Product;
};
