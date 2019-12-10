import { Router } from 'express';
const router = Router();

// Requests 
// Get
router.get('/', async (req, res) => {
  console.log('----------------');
  console.log(req.query);
  console.log('Get Request made');

  // Find all contacts from the userid
  const contacts = await req.context.models.Contact.findAll({
    where: {
      userId: req.query.userid
    }
  });
  return res.send(contacts);
});

// quickCallContact/:userid - Asychronously get request
router.get('/quickCallContact/:userid', async (req, res) => {

  console.log("_____ getting quick call contact ______");

  // Find contact for a quick contact.
  const contact = await req.context.models.Contact.findAll({
    where: {
      isQuickContact: true,
      userId: req.params.userid
    }
  });

  console.log(contact);

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

// Post
// Return creaeted contact
router.post('/', async (req, res) => {
  console.log('_______POST_______');
  console.log(req.body.name);

  // Create Contact info.
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

// Update Contact
router.put('/:contactId', async (req, res) => {
  console.log('_________PUT________');
  console.log(req.body.name);
  console.log(req.body);

  // Was a quick contact made?
  if (req.body.isQuickContact) {
    const updateFalse = await req.context.models.Contact.update(
      {
        isQuickContact: false,
      },
      { where: { isQuickContact: true } }
    );
  }

  // Update contact info.
  const contact = await req.context.models.Contact.update(
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      isQuickContact: req.body.isQuickContact,
      email: req.body.email,
      avatarUrl: req.body.avatarUrl,
      nickName: req.body.nickName
    },
    { where: { id: req.params.contactId } }
  );

  return res.send(contact);
});

// Delete
// Return confirmed deleted contact info.
router.delete('/:contactId', async (req, res) => {
  const result = await req.context.models.Contact.destroy({
    where: { id: req.params.contactId },
  });

  return res.send(true);
});

export default router;