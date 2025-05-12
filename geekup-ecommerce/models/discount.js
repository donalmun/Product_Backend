module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    'Discount',
    {
      categoryId: { type: DataTypes.INTEGER, allowNull: true },
      productId: { type: DataTypes.INTEGER, allowNull: true },
      percent: { type: DataTypes.INTEGER, allowNull: false },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
    },
    {}
  );
  Discount.associate = function (models) {
    Discount.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Discount.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return Discount;
};
