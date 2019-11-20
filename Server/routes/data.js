import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();


router.post('/', async (req, res) => {
  console.log('_________________________');
  console.log(req.body.name);
  const data = await req.context.models.Data.create({
    x: req.body.x,
    y: req.body.y,
    z: req.body.z,
    mac: req.body.mac,
  });

  return res.send(alert);
});


export default router;
