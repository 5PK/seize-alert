import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'seize',
  'root',
  'th3d4rkt0w3r',
  {
    dialect: 'mysql',
  },
);

const models = {
  User: sequelize.import('./user'),
  Contact: sequelize.import('./contact'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;