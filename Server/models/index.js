import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
  },
);

const models = {
  User: sequelize.import('./user'),
  Contact: sequelize.import('./contact'),
  Alert: sequelize.import('./alert'),
  Data: sequelize.import('./data')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
