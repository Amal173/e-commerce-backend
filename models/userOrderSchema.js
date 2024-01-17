const mongoose = require('mongoose');


const userOrderSchema = mongoose.Schema({

  userId: {
    type: String,
    required: true
  },
  products: {
    type: [],
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  orderDate: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    default: "pending"
  },
  billingAddress: {
    type: {},

  },
  shippingAddress: {
    type: {},

  },


});

module.exports = mongoose.model('userOrder', userOrderSchema); 