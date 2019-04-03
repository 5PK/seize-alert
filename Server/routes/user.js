import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.post('/', async (req, res) => {
  console.log("-----------------");
  console.log("Post request made");
  console.log(req.body.email);
  console.log(req.body.password);
  console.log("-----------------");
  const user = await req.context.models.User.create({
    email: req.body.email,
    password: req.body.password
  });

  return res.status(200).send(user);
});

export default router;