const express=require('express')
const router=express.Router()
const {stripeRetriveSession}=require('../Controllers/stripePaymentController')



router.route('/retrive-checkout-session/:id').get(stripeRetriveSession)


module.exports=router