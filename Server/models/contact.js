const contact = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
      name: DataTypes.STRING,
    });
  
    Contact.associate = models => {
        Contact.belongsTo(models.User);
    };
  
    return Contact;
  };
  
  export default contact;