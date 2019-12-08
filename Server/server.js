import "dotenv/config";

import express from "express";

import bodyParser from "body-parser";

import models, { sequelize } from "./models";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
    //me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

app.use("/user", routes.user);
app.use("/contact", routes.contact);
app.use("/seizure", routes.seizure);
app.use("/sms", routes.sms);
app.use("/data", routes.data);
app.use("/admin", express.static("public"), routes.admin);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithContacts();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithContacts = async () => {
  await models.User.create(
    {
      email: "ktran@bashx3.ca",
      password: "test",
      contacts: [
        {
          name: "Luke",
          avatarUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          nickName: "The T-SQL lover",
          phoneNumber: 9054059920,
          isQuickContact: true,
          email: "luke@thompson.ca"
        }
      ]
    },
    {
      include: [models.Contact]
    }
  );

  await models.User.create(
    {
      email: "1trankev@gmail.com",
      password: "test",
      contacts: [
        {
          name: "Carla",
          avatarUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          nickName: "The anime character",
          phoneNumber: 9054059920,
          isQuickContact: false,
          email: "Carla@sison.ca"
        },
        {
          name: "Riley",
          avatarUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          nickName: "The rogue class",
          phoneNumber: 9054059920,
          isQuickContact: false,
          email: "Riley@hancox.ca"
        }
      ]
    },
    {
      include: [models.Contact]
    }
  );

  var i;
  for (i = 0; i < 5; i++) {
    await models.Seizure.create(
        {
          dateOccured: new Date(),
          isSeizure: 1
        }
      );
  }


};
