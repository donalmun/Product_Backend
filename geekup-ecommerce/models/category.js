module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {}
  );
  Category.associate = function (models) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
    Category.hasMany(models.Discount, { foreignKey: 'categoryId' });
  };
  return Category;
};
