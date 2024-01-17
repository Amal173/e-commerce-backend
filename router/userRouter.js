const express = require("express");
const router = express.Router();
const { getUser, getOneUser, createUser, editUser,deleteUser,loginUser,AddCartUser,getCartProducts,removeCartProduct }=require('../Controllers/userController')



router.route('/').get(getUser)
router.route('/').post(createUser)
router.route('/:id').get(getOneUser)
router.route('/:id').put(editUser)
router.route('/:id').delete(deleteUser)
router.route('/login').post(loginUser)
router.route('/cart/:id').put(AddCartUser)
router.route('/cart/products/:id').get(getCartProducts)
router.route('/cart/products/delete/:id').put(removeCartProduct)


module.exports=router