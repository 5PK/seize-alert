import { arch } from "os";

const alert = (sequelize, DataTypes) => {
    const Alert = sequelize.define('alert', {
      dateOccured: DataTypes.DATE,
      armVariance : DataTypes.DOUBLE,
      ankleVariance : DataTypes.DOUBLE
    });
  
    Alert.associate = models => {
        Alert.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Alert;
  };
  
  export default alert;