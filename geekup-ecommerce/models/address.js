module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
      district: { type: DataTypes.STRING, allowNull: false },
      commune: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      typeHousing: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Address.associate = function (models) {
    Address.belongsTo(models.User, { foreignKey: 'userId' });
    Address.hasMany(models.Order, { foreignKey: 'addressId' });
  };
  return Address;
};
