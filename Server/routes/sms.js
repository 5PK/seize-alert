import { Router } from "express";

import Nexmo from "nexmo";

const nexmo = new Nexmo(
  {
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
  },
  { debug: true }
);

const router = Router();

router.post("/", (req, res) => {
  res.send(req.body);
  const toNumber = process.env.HARDCODED_PHONE_NUMBER;
  const text = "test";
  nexmo.message.sendSms(
    process.env.NEXMO_API_NUMBER,
    toNumber,
    text,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Optional: add socket.io -- will explain later
      }
    }
  );
});

export default router;