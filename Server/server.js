import 'dotenv/config';
import express from 'express';
import models, { sequelize } from './models';

/*
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7',
  database : 'my_db'
});
*/

const app = express();

// On server restart, re-intialize database
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithContacts();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithContacts = async () => {
  await models.User.create(
    {
      username: 'chungus',
      contacts: [
        {
          name: 'chungolinus',
        },
      ],
    },
    {
      include: [models.Contact],
    },
  );  

  await models.User.create(
    {
      username: 'chungo',
      contacts: [
        {
          name: 'chungolina',
        },
        {
          name: 'chungolima',
        },
      ],
    },
    {
      include: [models.Contact],
    },
  );


};