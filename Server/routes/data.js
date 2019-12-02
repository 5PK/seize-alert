import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();


router.post('/', async (req, res) => {
  console.log('_________________________');
  const data = await req.context.models.Data.create({
    ZeroId: req.body.ZeroId,
    ZeroData: req.body.ZeroData,
    OneId: req.body.OneId,
    OneData: req.body.OneData,
    Timestamp: req.body.Timestamp
  });

  return res.send(alert);
});


export default router;
