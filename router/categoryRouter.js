const express = require("express");
const router = express.Router();
const StoreFile=require('../middleware/multer')
const multer=require("multer");
const {getCategory,getOneCategory,createCategory,deleteCategory,editCategory}=require('../Controllers/categoryController')

router.route('/').get(getCategory);
router.route('/:id').get(getOneCategory);
router.route('/delete/:id').put(deleteCategory);
router.route('/').post(multer({storage:StoreFile}).single("categoryImage"), createCategory);
router.route('/:id').put(multer({storage:StoreFile}).single("categoryImage"), editCategory);

module.exports=router;