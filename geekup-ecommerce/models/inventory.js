module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    'Inventory',
    {
      storeId: { type: DataTypes.INTEGER, allowNull: false },
      productVariantId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {}
  );
  Inventory.associate = function (models) {
    Inventory.belongsTo(models.Store, { foreignKey: 'storeId' });
    Inventory.belongsTo(models.ProductVariant, {
      foreignKey: 'productVariantId',
    });
  };
  return Inventory;
};
