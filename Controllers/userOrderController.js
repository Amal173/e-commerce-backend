const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);
const userOrder = require('../models/userOrderSchema')
const payment = require('../models/stripePaymentSchema')




const getOrders = (async (req, res) => {
    console.log("gaoao", req.params.id);
    const userId = req.params.id
    try {
        const userOrders = await userOrder.find({ userId });
        if (!userOrders) {

            return res.status(500).json({ message: "error to get the orders" });
        }
        res.status(200).json({ userOrders });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


const stipeCheckout = (async (req, res) => {
    try {
        console.log(req.body);
        const { cartItems, userId, totalPrice } = req.body
        const date = new Date()
        const newDate = new Date(date);
        const currentDate = newDate.toDateString();
        const userOrders = await userOrder.create({
            products: cartItems,
            userId,
            orderDate: currentDate,
            totalPrice
        })

        console.log("userOrders", userOrders._id);
        const line_items = cartItems.map((items) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: items.productName,
                        images: items.productImages,
                        description: items.productDescription,
                        metadata: {
                            id: items._id
                        }
                    },
                    unit_amount: items.productPrice
                },
                quantity: 1,
            }
        })


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            billing_address_collection: 'required', // or 'auto'
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU'], // Add the countries you want to allow shipping to
            },
            success_url: `${process.env.BASE_URL}/checkout-success/?id=${userOrders._id}&cartItems=${JSON.stringify(cartItems)}`,
            cancel_url: `${process.env.BASE_URL}/cart`,
        });

        console.log(userOrders._id);
        const payments = await payment.create({
            SessionId: session.id,
            orderId: userOrders._id,
            paymentStatus: session.payment_status,
        })

        console.log("payment", payments);
        console.log({ url: session });
        res.send({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message })
    }
})




module.exports = { stipeCheckout, getOrders }