const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  SessionId: {
    type: String,
    required: true
  },

  orderId: {
    type: String,
    required: true
  },

  paymentStatus: {
    type: String,

  },

});

module.exports = mongoose.model('payment', paymentSchema);