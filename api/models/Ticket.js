const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' },
  customerId: { type: String, required: true },
  createdBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
