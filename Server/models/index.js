import Sequelize from 'sequelize';

// Initialized sequelized data from the database.
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
  },
);

// Initialized data models.
const models = {
  User: sequelize.import('./user'),
  Contact: sequelize.import('./contact'),
  Seizure: sequelize.import('./seizure'),
  Data: sequelize.import('./data')
};

// Assoicate each models with a key.
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;