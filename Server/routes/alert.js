import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
  console.log('Get Request made');
  const alerts = await req.context.models.Alert.findAll(
    {order:[[ 'createdAt', 'DESC' ]]},
    {where: { userId: req.query.userid}}
    );
  return res.send(alerts);
});

router.get('/lastAlert/:userid', async (req, res) => {
  console.log('Get Request made');
  const alerts = await req.context.models.Alert.findAll({
    limit:1,
    order:[[ 'createdAt', 'DESC' ]]
  },{
    where: {
      userId: req.params.userid 
    }
  }
  );
  return res.send(alerts);
});


router.post('/', async (req, res) => {
  console.log('_________________________');
  console.log(req.body.name);
  const alert = await req.context.models.Alert.create({
    dateOccured: req.body.dateOccured,
    armVariance: req.body.armVariance,
    ankleVariance: req.body.ankleVariance,
    userId: req.body.userId,
  });

  return res.send(alert);
});


export default router;