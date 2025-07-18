const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/rbacMiddleware');
const {
  createTicket,
  ticketDoneWebhook
} = require('../controllers/ticketController');

router.post('/', auth, createTicket);
router.post('/webhook/ticket-done', ticketDoneWebhook);

module.exports = router;
const registry = require('../registry.json');

router.get('/me/screens', auth, (req, res) => {
  const { customerId } = req.user;
  const screens = registry[customerId] || [];
  res.json(screens);
});
