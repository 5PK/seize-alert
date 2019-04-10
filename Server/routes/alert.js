import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
  console.log('Get Request made');
  const alerts = await req.context.models.Alert.findAll();
  return res.send(alerts);
});


router.post('/', async (req, res) => {
  console.log('_________________________');
  console.log(req.body.name);
  const alert = await req.context.models.Alert.create({
    date: req.body.date,
    armVariance: req.body.armVariance,
    ankleVariance: req.body.ankleVariance,
  });

  return res.send(alert);
});


export default router;