import { Router } from 'express';
const router = Router();

// Requests

// (Async) Get - User info
router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();

  // Test, making sure things are working as intended.
  console.log("hello");
  return res.send(users);
});

// (Async) Get - User
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findAll({
    where: {
      id: req.params.userId 
    }
  });
  return res.send(user);
});

// (Async) Post - Create User.  
router.post('/', async (req, res) => {
  console.log("-----------------");
  console.log("Post request made");
  console.log(req.body.email);
  console.log(req.body.password);
  console.log("-----------------");
  
  // Create user.
  const user = await req.context.models.User.create({
    email: req.body.email,
    password: req.body.password
  });

  return res.status(200).send(user);
});

export default router;