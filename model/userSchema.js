const mongoose=require("mongoose");
require("../model/modelConfig")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    isadmin: {
        type: Number,
        default: 0
    }
});

const userData=mongoose.model("user",userSchema);

module.exports=userData;
