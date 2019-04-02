import uuidv4 from 'uuid/v4';
import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
  console.log('Get Request made');
  const contacts = await req.context.models.Contact.findAll();
  return res.send(contacts);
});

router.get('/:contactId', async (req, res) => {
  const contact = await req.context.models.Contact.findById(
    req.params.contactId,
  );
  return res.send(contact);
});

router.post('/', async (req, res) => {
  const contact = await req.context.models.Contact.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(contact);
});

router.delete('/:contactId', async (req, res) => {
  const result = await req.context.models.Contact.destroy({
    where: { id: req.params.contactId },
  });

  return res.send(true);
});

export default router;