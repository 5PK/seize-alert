import 'dotenv/config';
//import cors from 'cors';
import express from 'express';

import bodyParser from 'body-parser';


import models, { sequelize } from './models';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/contacts', routes.contact);

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
            email: 'ktran',
            contacts: [
                {
                    name: 'Luke',
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    nickName: 'The T-SQL lover',
                    phoneNumber: '905 - 405 - 9920',
                    isQuickContact: 1,
                    email: 'luke@thompson.ca'
                },
            ],
        },
        {
            include: [models.Contact],
        },
    );

    await models.User.create(
        {
            email: 'Chungloid',
            contacts: [
                {
                    name: 'Carla',
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    nickName: 'The anime character',
                    phoneNumber: '905 - 405 - 9920',
                    isQuickContact: 1,
                    email: 'Carla@sison.ca'
                },
                {
                    name: 'Riley',
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    nickName: 'The rogue class',
                    phoneNumber: '905 - 405 - 9920',
                    isQuickContact: 1,
                    email: 'Riley@hancox.ca'
                },
            ],
        },
        {
            include: [models.Contact],
        },
    );
};