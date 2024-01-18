// This is your test secret API key.
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);
const payments = require('../models/stripePaymentSchema')
const order = require('../models/userOrderSchema')


const stripeRetriveSession = (async (req, res) => {
  try {
    const orderId = req.params.id
    const payment = await payments.findOne({ orderId })

    const session = await stripe.checkout.sessions.retrieve(
      payment.SessionId
    );

    const billingAddress = session.shipping_details.address;
    const shippingAddress = session.shipping_details.address;
    const customerEmail = session.customer_details.email;

    await payments.findByIdAndUpdate(payment._id, { paymentStatus: session.payment_status })
    await order.findByIdAndUpdate(orderId, { orderStatus: session.status, billingAddress: billingAddress, shippingAddress: shippingAddress, customerEmail: customerEmail })
    res.send({ session: session })
  } catch (error) {
    console.log({ err: error.message });
  }
})




module.exports = { stripeRetriveSession }