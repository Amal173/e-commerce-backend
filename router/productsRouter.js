const express = require("express");
const router = express.Router();
const multer = require("multer");
const StoreFile = require('../middleware/multer')
const{getProducts, getOneProduct, createProduct, editProduct, deleteProduct }=require('../Controllers/productsController');


router.route('/').get(getProducts)
router.route('/:id').get(getOneProduct)
router.route('/delete/:id').put(deleteProduct)
router.route('/').post(multer({storage:StoreFile}).array('productImages',5),createProduct)
router.route('/:id').put(multer({storage:StoreFile}).array('productImages',5),editProduct)

module.exports=router;