import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();

router.post('/', async (req, res) => {
  console.log('_________________________');
 
  console.log(req.body)
  req.context.models.Data.bulkCreate(req.body.array)

  return res.send();
});

router.get('/', async (req, res) => {
  console.log('_________________________');
 
  console.log(req.body)
  const datas = await req.context.models.Data.findAll();
  return res.send(datas);
});

export default router;
