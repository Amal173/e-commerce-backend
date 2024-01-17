const express = require("express");
const router = express.Router();
const {getAdmin,getOneAdmin,createAdmin,deleteAdmin,editAdmin,loginAdmin}=require('../Controllers/adminController')


router.route('/').get(getAdmin)
router.route('/:id').get(getOneAdmin)
router.route('/').post(createAdmin)
router.route('/:id').delete(deleteAdmin)
router.route('/:id').put(editAdmin)
router.route('/login').post(loginAdmin)

module.exports=router