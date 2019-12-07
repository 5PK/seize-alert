const data = (sequelize, DataTypes) => {
  const Data = sequelize.define('data', {
    limb: DataTypes.STRING,
    data: DataTypes.STRING,
    timestamp: DataTypes.STRING
  }, {
    timestamps: false
  });

  Data.associate = models => {
    Data.belongsTo(models.Seizure, { foreignKey: 'seizureId' });
  };

  return Data;
};

export default data;
