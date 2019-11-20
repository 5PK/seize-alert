const data = (sequelize, DataTypes) => {
    const Data = sequelize.define('data', {
      x: DataTypes.INTEGER,
      y: DataTypes.INTEGER,
      z: DataTypes.INTEGER,
      mac: DataTypes.STRING
    });
  
    Data.associate = models => {
        Data.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Data;
  };
  
  export default data;
