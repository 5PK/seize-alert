import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

// Requests

// Post
router.post("/", async (req, res) => {
  console.log("_________Post Seizure_____________");
  console.log(req.body.name);

  // Create Seizure data.
  const seizure = await req.context.models.Seizure.create({
    dateOccured: req.body.dateOccured,
    isSeizure: req.body.isSeizure,
    userId: 1
  });

  // Was seizure data required?
  console.log(seizure);

  req.body.array.forEach(element => {
    element['seizureId'] = seizure.dataValues.id
  });

  console.log(req.body.array);
  const data = await req.context.models.Data.bulkCreate(req.body.array);
  console.log(data);
  return res.send(seizure.dataValues);
});

// Get Seizure data.
router.get("/g/:isSeizure", async (req, res) => {
  console.log("_________Post Seizure_____________");
  console.log(req.query);

  // Find data that is determined to be a seizure.
  const seizures = await req.context.models.Data.findAll({
    where: {
      isSeizure: req.params.isSeizure
    }
  });

  // Debugging purposes. Display seizure data.
  console.log(seizures);s
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
