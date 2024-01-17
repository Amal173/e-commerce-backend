const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productSpecs:[String],
    
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImages:[String],

    categoryId:{
        type:String,
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
      }
})


module.exports=mongoose.model('product', productSchema);