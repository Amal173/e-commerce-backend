// This is your test secret API key.
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);
const payments = require('../models/stripePaymentSchema')
const order = require('../models/userOrderSchema')


const stripeRetriveSession = (async (req, res) => {
  try {
    const orderId = req.params.id
    console.log(orderId, "shdf");

    const payment = await payments.findOne({ orderId })

    console.log(payment);
    const session = await stripe.checkout.sessions.retrieve(
      payment.SessionId
    );
    console.log(session, "session");

    const billingAddress = session.shipping_details.address;
    const shippingAddress = session.shipping_details.address;


    const updateOrder = await order.findByIdAndUpdate(orderId, { orderStatus: session.status ,billingAddress:billingAddress,shippingAddress:shippingAddress})
console.log(updateOrder);

    console.log('Billing Address:', billingAddress);
    console.log('Shipping Address:', shippingAddress);
    res.send({ session: session })
  } catch (error) {
    console.log({ err: error.message });
  }
})




module.exports = { stripeRetriveSession }