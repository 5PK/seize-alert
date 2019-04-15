import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {


  Console.log("login request");

    const user = await req.context.models.User.findAll({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });

    Console.log(user);

    if (user === null || user.length ==! 1){
      return res.status(404).send(user);
    }else{
      return res.status(200).send(user);
    }
  });


  router.post('/', async (req, res) => {


    console.log("login request");
  
      const user = await req.context.models.User.findAll({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      });
  
      console.log(user);
  
      if (user === null || user.length ==! 1){
        return res.status(404).send(user);
      }else{
        return res.status(200).send(user);
      }
    });

export default router;