const data = (sequelize, DataTypes) => {
  const Data = sequelize.define('data', {
    limb: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    z: DataTypes.FLOAT,
    timestamp: DataTypes.STRING,
    isSeizure: DataTypes.BOOLEAN
  }, {
    timestamps: false
  });

  return Data;
};

export default data;
