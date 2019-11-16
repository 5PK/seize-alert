const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
    }
  },
  {timestamps: false,});

  User.associate = models => {
    User.hasMany(models.Contact, { onDelete: 'CASCADE' }, { foreignKey: 'userId' });
    User.hasMany(models.Alert, { onDelete: 'CASCADE' }, { foreignKey: 'userId' });
    User.hasMany(models.Data, { onDelete: 'CASCADE' }, { foreignKey: 'userId' });
  };

 

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login },
    });

    /*
    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }
    */
    return user;
  };

  return User;
};

export default user;
