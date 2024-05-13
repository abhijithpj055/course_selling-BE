import Instructor from "../models/InstructorModel.js";
import { adminToken } from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

export const signup=async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        const instructorExist=await Instructor.findOne({email})
        if(instructorExist){
            return res.send("Instructor already exist")
        }
    
        const saltRounds=10;
        const hashPassword=await bcrypt.hash(password,saltRounds)
        const newInstructor=new Instructor({
            name,
            email,
            hashPassword,
            role:"instructor"
        })
    
    await newInstructor.save()
    
    if(!newInstructor){
        res.send("Instructor is not created")
    }
    const token=adminToken(newInstructor)
    res.cookie("token",token)
    res.send("Signed In")
     
    } catch (error) {
        console.log(error,"Something went to wrong")
    }
    
}

//signin

export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const instructor=await Instructor.findOne({email})
        if(!instructor){
            res.send("Instructor is not found")
        }
        const matchPassword= await bcrypt.compare(password,instructor.hashPassword)
        if(!matchPassword){
            res.send("Incorrect Password")
        }

        const token=adminToken(instructor)
        res.cookie("token",token)
        res.send("Logged in succesfully")
    } catch (error) {
     console.log(error);
     res.status(500).send("Internal sever error")   
    }
}

//get all instructors

export const getAllInstructors=async(req,res)=>{
    const instructors=await Instructor.find()
    res.send(instructors)
}

//remove instructor

export const removeInstructor=async(req,res)=>{
    const id=req.params.id;
    const instructor=await Instructor.find({_id:id})
    if(!instructor){
        return res.send("Instructor not exist")
    }
    const remove=await Instructor.deleteOne({_id:id})
    if(!remove){
        return res.send("Failed to remove")
    }
    return res.send("Removed Successfully")
}