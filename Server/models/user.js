/**
 * Defines a sequelized user data of data types and returns a user data that exists in the database.
 * @param {any} sequelize Sequelized data from the database.
 * @param {any} DataTypes Data types for the sequelized data.
 * @returns A sequelized user data.
 */
const user = (sequelize, DataTypes) => {

  // Define a user.
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
    { timestamps: false, });

  // Assoicate user from the database.
  User.associate = models => {
    User.hasMany(models.Contact, { onDelete: 'CASCADE' }, { foreignKey: 'userId' });
    User.hasMany(models.Seizure, { onDelete: 'CASCADE' }, { foreignKey: 'userId' });
  };

  // Find the user login credentials.
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
