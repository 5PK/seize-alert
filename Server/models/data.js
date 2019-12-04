const data = (sequelize, DataTypes) => {
  const Data = sequelize.define('data', {
    limb: DataTypes.STRING,
    data: DataTypes.STRING,
    timestamp: DataTypes.STRING
  }, {
    timestamps: false
  });

  Data.associate = models => {
    Data.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Data;
};

export default data;
