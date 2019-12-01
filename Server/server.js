//StAuth10065: I Steven Luke Thompson, 000736020 certify that this material is my original work.
//No other person's work has been used without due acknowledgement.
//I have not made my work available to anyone else.

var express = require('express');
var app = express();
let db = require('./db.js');

app.use(express.json());

const SqlOperationType = {
  InboundData: 1,
  OutboundData: 2,
  NoIO: 3
};

function executeSqlQuery(sql, parameters, SqlOperationType, res, successMessage, errorMessage ){
  return new Promise( ( resolve, reject ) =>{
    db.serialize(function(){
      var stmt = db.prepare(sql);
      if( SqlOperationType == 1 ){
        parameters.forEach( element=>{
          stmt.run([ element.ZeroId, element.ZeroData, element.OneId, element.OneData, element.Timestamp ], function(err,row){
            if(err){
              console.log(err);
              reject(console.log(errorMessage));
            }else{
              resolve(console.log(successMessage));
            }
          });
        });
      }else if( SqlOperationType == 2){
        stmt.all( function(err,rows){
          if(err){
            console.log(err);
            reject(console.log(errorMessage));
          }else{
            console.log(successMessage);
            resolve(res.send(JSON.stringify(rows)));
          }
        });
      }
      else if( SqlOperationType == 3 ){
        stmt.run(function(err,row){
          if(err){
            console.log(err);
            reject(console.log(errorMessage));
          }else{
            resolve(console.log(successMessage));
          }
        });
      }
      stmt.finalize();
    });
  });
}

async function insertData(req,res){
  var sql = "INSERT INTO Data (ZeroId, ZeroData, OneId, OneData, Timestamp) VALUES (?,?,?,?,?)";
  await executeSqlQuery(sql, [req.body], SqlOperationType.InboundData,res, "POST Command Success", "POST Command Failed" );
  res.send("CREATE ENTRY SUCCESSFULL");
}


app.post('/api/data', insertData);

var server = app.listen(3000, function()
{
  console.log("Server listening...");
});
// import 'dotenv/config'
// //import cors from 'cors'
// import express from 'express'

// import bodyParser from 'body-parser'

// import models, { sequelize } from './models'

// import routes from './routes'

// const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(async (req, res, next) => {
//     req.context = {
//         models
//         //me: await models.User.findByLogin('rwieruch'),
//     }
//     next()
// })

// app.use('/', routes.session)
// app.use('/users', routes.user)
// app.use('/contacts', routes.contact)
// app.use('/alerts', routes.alert)
// app.use('/sms', routes.sms)
// app.use('/data', routes.data)
// app.use('/admin', express.static('public'), routes.admin)

// const eraseDatabaseOnSync = true

// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//     if (eraseDatabaseOnSync) {
//         createUsersWithContacts()
//     }

//     app.listen(process.env.PORT, () =>
//         console.log(`Example app listening on port ${process.env.PORT}!`),
//     )
// })

// const createUsersWithContacts = async () => {
//     await models.User.create(
//         {
//             email: 'ktran@bashx3.ca',
//             password: 'test',
//             contacts: [
//                 {
//                     name: 'Luke',
//                     avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//                     nickName: 'The T-SQL lover',
//                     phoneNumber: 9054059920,
//                     isQuickContact: true,
//                     email: 'luke@thompson.ca'
//                 },
//             ],
//             alerts:[
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },        {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 }
//             ]

//         },
//         {
//             include: [models.Contact],
//         },
//     )

//     await models.User.create(
//         {
//             email: '1trankev@gmail.com',
//             password:'test',
//             contacts: [
//                 {
//                     name: 'Carla',
//                     avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//                     nickName: 'The anime character',
//                     phoneNumber: 9054059920,
//                     isQuickContact: false,
//                     email: 'Carla@sison.ca'
//                 },
//                 {
//                     name: 'Riley',
//                     avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//                     nickName: 'The rogue class',
//                     phoneNumber: 9054059920,
//                     isQuickContact: false,
//                     email: 'Riley@hancox.ca'
//                 },
//             ],
//             alerts:[
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 },        
//                 {
            
//                     dateOccured: new Date(),
//                     armVariance: 100,
//                     ankleVariance: 100
        
//                 }
//             ]
//         },
//         {
//             include: [models.Contact],
//         },
//     )
// }
