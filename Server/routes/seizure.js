import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();



router.post("/", async (req, res) => {
  console.log("_________Post Seizure_____________");

  const seizure = await req.context.models.Seizure.create({
    dateOccured: req.body.dateOccured
  });

  console.log(seizure)

  return res.send(seizure.dataValues);
});

router.get("/last", async (req, res) => {
  console.log("_________Get Last Seizure_____________");

  const seizure = await req.context.models.Seizure.findOne({order: [ [ 'createdAt', 'DESC' ]],});

  console.log(JSON.stringify(seizure.dataValues))
  
  return res.send(seizure.dataValues);
});

router.get("/g/", async (req, res) => {
  console.log("get seizures Seizure_____________");

  const seizures = await req.context.models.Data.findAll({
    where: {
      isSeizure: req.query.isSeizure,
      limb: req.query.limb
    }
  });

  return res.send(seizures);
});

/*
router.get("/", async (req, res) => {
  console.log("Get Seisure Request made");

  const seizures = await req.context.models.Seizure.findAll();
  console.log(seizures);

  return res.send(seizures);
});
*/

export default router;
