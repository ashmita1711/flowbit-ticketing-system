const Ticket = require('../models/Ticket');
const axios = require('axios');

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { customerId, email } = req.user;

    const ticket = await Ticket.create({
      title,
      description,
      customerId,
      createdBy: email
    });

    // Trigger n8n
    await axios.post('http://n8n:5678/webhook-test', {
      ticketId: ticket._id,
      customerId
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.ticketDoneWebhook = async (req, res) => {
  const secretHeader = req.headers['x-flowbit-secret'];
  const expectedSecret = process.env.WEBHOOK_SECRET;

  if (secretHeader !== expectedSecret) {
    return res.status(403).json({ error: 'Invalid secret' });
  }

  try {
    const { ticketId } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {
      status: 'done'
    }, { new: true });

    // (Optional) Notify frontend (via polling or socket)
    res.json({ message: 'Ticket updated', ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
