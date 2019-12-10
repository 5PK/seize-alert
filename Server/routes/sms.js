import { Router } from "express";

import Nexmo from "nexmo";

// Initializing Nexmo
const nexmo = new Nexmo(
  {
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
  },
  { debug: true }
);

const router = Router();

// API keys for Nemo and twilio.
const accountSid = "ACe622707f4d7bb42d1a2b805153bb3ece";
const authToken = "82e9607d57123f953c488c13df40f82b";
const client = require("twilio")(accountSid, authToken);

// Requests for SMS
router.post("/", (req, res) => {
  console.log('hello sms')
  client.messages
  .create({
    body: `SEIZURE WARNING! A seizure event has been detected for patient Riley Hancox`,
    from: "+12892051914",
    to: 12896839356
  })
  .then(message => console.log(message.sid));  
});

export default router;