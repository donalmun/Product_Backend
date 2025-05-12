module.exports = (sequelize, DataTypes) => {
  const UserVoucher = sequelize.define(
    'UserVoucher',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      voucherId: { type: DataTypes.INTEGER, allowNull: false },
      used: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {}
  );
  UserVoucher.associate = function (models) {
    UserVoucher.belongsTo(models.User, { foreignKey: 'userId' });
    UserVoucher.belongsTo(models.Voucher, { foreignKey: 'voucherId' });
  };
  return UserVoucher;
};
