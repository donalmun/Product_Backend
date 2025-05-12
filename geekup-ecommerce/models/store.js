module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Store.associate = function (models) {
    Store.hasMany(models.Inventory, { foreignKey: 'storeId' });
  };
  return Store;
};
