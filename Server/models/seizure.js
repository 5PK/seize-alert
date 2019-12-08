const seizure = (sequelize, DataTypes) => {
    const Seizure = sequelize.define('seizure', {
      dateOccured: DataTypes.DATE,
    });
  
    return Seizure;
  };
  
  export default seizure;