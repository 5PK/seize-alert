import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log("Get Seisure Request made");

  const seizures = await req.context.models.Seizure.findAll();
  console.log(seizures);

  return res.send(seizures);
});

router.post("/", async (req, res) => {
  console.log("_________Post Seizure_____________");
  console.log(req.body.name);

  const seizure = await req.context.models.Seizure.create({
    dateOccured: req.body.dateOccured,
    isSeizure: req.body.isSeizure,
    userId: 1
  });

  console.log(seizure);

  req.body.array.forEach(element => {
    element['seizureId'] = seizure.dataValues.id
  });

  console.log(req.body.array)

  const data = await req.context.models.Data.bulkCreate(req.body.array);

  
  console.log(data);

  return res.send(seizure.dataValues);
});

router.get("/g/:seizureid", async (req, res) => {
  console.log("_________Post Seizure_____________");

  const seizures = await req.context.models.Data.findAll({
    where: {
      userId: req.query.seizureid
    }
  });

  console.log(seizures);
});

export default router;
