module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define(
    'Voucher',
    {
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING, allowNull: true },
      discountPercent: { type: DataTypes.INTEGER, allowNull: false },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
    },
    {}
  );
  Voucher.associate = function (models) {
    Voucher.hasMany(models.UserVoucher, { foreignKey: 'voucherId' });
    Voucher.hasMany(models.OrderVoucher, { foreignKey: 'voucherId' });
  };
  return Voucher;
};
