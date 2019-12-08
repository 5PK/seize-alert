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

  console.log(seizure)

  return res.send(seizure.dataValues);
});

router.get("/g/:isSeizure", async (req, res) => {
  console.log("_________Post Seizure_____________");


  console.log(req.query)

  const seizures = await req.context.models.Data.findAll({
    where: {
      isSeizure: req.params.isSeizure
    }
  });

  console.log(seizures);
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
