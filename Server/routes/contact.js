import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
  console.log('----------------');
  console.log(req.query)
  console.log('Get Request made');
  
  const contacts = await req.context.models.Contact.findAll({
    where: {
      userId: req.query.userid
    }
  });
  return res.send(contacts);
});

router.get('/quickCallContact/:userid', async (req, res) => {

  console.log("_____ getting quick call contact ______")

  const contact = await req.context.models.Contact.findAll({
    where: {
      isQuickContact: true,
      userId: req.params.userid 
    }
  });

  console.log(contact)

  return res.send(contact);
});

/*
router.get('/:contactId', async (req, res) => {
  const contact = await req.context.models.Contact.findById(
    req.params.contactId,
  );
  return res.send(contact);
});
*/


router.post('/', async (req, res) => {
  console.log('_______POST_______');
  console.log(req.body.name);
  const contact = await req.context.models.Contact.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isQuickContact: req.body.isQuickContact,
    email: req.body.email,
    avatarUrl: req.body.avatarUrl,
    nickName: req.body.nickName,
    userId: req.body.userId,
  });

  return res.send(contact);
});

router.put('/:contactId', async (req, res) => {
  console.log('_________PUT________');
  console.log(req.body.name);

  console.log(req.body);

  if(req.body.isQuickContact){
    const updateFalse = await req.context.models.Contact.update(
      {
      isQuickContact: false,
      },
      {where: { isQuickContact: true }}
    );
  }

  const contact = await req.context.models.Contact.update(
    {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isQuickContact: req.body.isQuickContact,
    email: req.body.email,
    avatarUrl: req.body.avatarUrl,
    nickName: req.body.nickName
    },
    {where: { id: req.params.contactId }}
  );

  return res.send(contact);
});


router.delete('/:contactId', async (req, res) => {
  const result = await req.context.models.Contact.destroy({
    where: { id: req.params.contactId },
  });

  return res.send(true);
});

export default router;