const express=require('express')
const router=express.Router()
const {stipeCheckout,getOrders,getAllOrders,getOrdersById}=require('../Controllers/userOrderController')

router.route('/create-checkout-session').post(stipeCheckout)
router.route('/userOrder/:id').get(getOrders)
router.route('/getOrder').get(getAllOrders)
router.route('/Order-details/:id').get(getOrdersById)


module.exports=router