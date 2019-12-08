/**
 * Defines a contact for a user from sequelized user data and initalizes them of data types.
 * returns a contact.
 * @param {any} sequelize Sequelized user data.
 * @param {any} DataTypes User data types.
 * Returns a contact.
 */
const contact = (sequelize, DataTypes) => {
  // Define contact.
  const Contact = sequelize.define('contact', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isQuickContact: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    nickName: DataTypes.STRING,
  });

  // Associate contact to a user based on a user id.
  Contact.associate = models => {
    Contact.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Contact;
};

export default contact;