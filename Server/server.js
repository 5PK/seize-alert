import 'dotenv/config';
//import cors from 'cors';
import express from 'express';


import models, { sequelize } from './models';

import routes from './routes';

const app = express();

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
            username: 'ktran',
            contacts: [
                {
                    name: 'Chungus',
                },
            ],
        },
        {
            include: [models.Contact],
        },
    );

    await models.User.create(
        {
            username: 'Chungloid',
            contacts: [
                {
                    name: 'Chungobungo',
                },
                {
                    name: 'Chingobingo',
                },
            ],
        },
        {
            include: [models.Contact],
        },
    );
};