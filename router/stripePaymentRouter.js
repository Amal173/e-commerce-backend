const express=require('express')
const router=express.Router()
const {stipeCheckout,getOrders}=require('../Controllers/userOrderController')

router.route('/create-checkout-session').post(stipeCheckout)
router.route('/userOrder/:id').get(getOrders)



module.exports=router