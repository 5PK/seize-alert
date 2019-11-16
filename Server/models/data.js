const data = (sequelize, DataTypes) => {
    const Data = sequelize.define('data', {
      x: DataTypes.INT,
      y: DataTypes.INT,
      z: DataTypes.INT,
      mac: DataTypes.STRING
    });
  
    Data.associate = models => {
        Data.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Data;
  };
  
  export default data;
