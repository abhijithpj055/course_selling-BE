import bcrypt from 'bcrypt'
import {generateToken} from'../utils/generateToken.js'
import User from '../models/userModel.js'

export const signup=async(req,res)=>{
    try {
        const {firstName,lastName,email,password}= req.body;

        const userExist= await User.findOne({email})

        if(userExist){
            res.send("User already exist")
        }

        const saltRounds=10;
        const hashPassword= await bcrypt.hash(password,saltRounds)
        const newUser=new User({
            firstName,
            lastName,
            email,
            hashPassword,
        })
          await newUser.save()
          
        if(!newUser){
            res.send("User not created")
        }
    
        const token=generateToken(email)
        res.cookie("token",token)
        res.send("Signed Up Successfully")
        
    } catch (error) {
        console.log(error,"Something went to wrong")
        return res.status(500).send("Internal Sever Error")
        
    }
}


export const signin= async(req,res)=>{

try {
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.send("User not exist")
    }

    const matchPassword=await bcrypt.compare(password,user.hashPassword)
    if(!matchPassword){
        res.send("Incorrect Password")
    }

    const token=generateToken(email)
    res.cookie(token)
    res.send("Login Successfully")
} catch (error) {
    console.log(error,"Something went to wrong")
    res.status(500).send("Internal server error")
}
}


