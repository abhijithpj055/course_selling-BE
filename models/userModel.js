import mongoose from'mongoose'

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    lastName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:30,
    },
    hashPassword:{
        type:String,
        required:true,
        minLength:8,
        

    },
    courses:[{type:mongoose.Types.ObjectId,
              ref:"Course"
    }],
},
{timestamps:true}
)

const User=mongoose.model("User",userSchema)

export default User