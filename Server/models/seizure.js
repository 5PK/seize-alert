const seizure = (sequelize, DataTypes) => {
    const Seizure = sequelize.define('seizure', {
      dateOccured: DataTypes.DATE,
      isSeizure: DataTypes.BOOLEAN
    });
  
    Seizure.associate = models => {
      Seizure.belongsTo(models.User, { foreignKey: 'userId' });
      Seizure.hasMany(models.Data, { foreignKey: 'seizureId' });
    };
  
    return Seizure;
  };
  
  export default seizure;