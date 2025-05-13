module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {}
  );
  Category.associate = function (models) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
    Category.hasMany(models.Discount, { foreignKey: 'categoryId' });
  };
  return Category;
};
