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
                    name: 'Chungus',
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    nickName: this.state.nick_name,
                    phoneNumber: this.state.phone_number,
                    isQuickContact: this.state.isQuickContact,
                    email: this.state.email
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
                    name: 'Chungobungo',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    nickName: this.state.nick_name,
                    phoneNumber: this.state.phone_number,
                    isQuickContact: this.state.isQuickContact,
                    email: this.state.email
                },
                {
                    name: 'Chingobingo',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    nickName: this.state.nick_name,
                    phoneNumber: this.state.phone_number,
                    isQuickContact: this.state.isQuickContact,
                    email: this.state.email
                },
            ],
        },
        {
            include: [models.Contact],
        },
    );
};