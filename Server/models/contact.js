const contact = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isQuickContact: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      nickName: DataTypes.STRING,
    });
  
    Contact.associate = models => {
        Contact.belongsTo(models.User);
    };
  
    return Contact;
  };
  
  export default contact;