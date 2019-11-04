import { Router } from "express";
var path = require('path');
const router = Router();

router.get("/", async (req, res) => {
  
  res.sendFile(path.join(__dirname, "/public", "login.html"));
});

router.post("/login", (req, res) => {
  console.log("login request");
  return res.send({msg:'success'});
});

router.post("/register", async (req, res) => {
  console.log("register request");
  return res.status(200);
});


export default router;
