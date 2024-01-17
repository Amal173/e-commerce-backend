const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    phonenumber:{
        type:String,
        required:true
    },
    cart:{
        type:[],
        required:false
    },

},
{
    timestamps: true
}

)

module.exports=mongoose.model("user",userSchema);