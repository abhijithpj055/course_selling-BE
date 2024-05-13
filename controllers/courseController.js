import { cloudinaryInstance } from "../config/cloudinary.js";
import Instructor from "../models/InstructorModel.js";
import Course from "../models/courseModel.js";

export const getCourses=async(req,res)=>{
    const courses=await Course.find();
    res.send(courses)
}

//create course
export const createCourse=async(req,res)=>{
    try {
        
        if(!req.file){
            return res.status(400).json({success:false,message:"No file uploaded"})
        }
        cloudinaryInstance.uploader.upload(req.file.path,async(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Error",
                })
            }

            const imageUrl=result.url;
            const {title,description,price,instructorEmail}=req.body;

            const findInstructor=await Instructor.find({email:instructorEmail})
            if(!findInstructor){
                return res.send("Please add Instructor first").status(201)
            }

            const createCourse=new Course({
                title,
                description,
                price,
                instructor:findInstructor._id,
                image:imageUrl,
            })

            const newCourseCreated=await createCourse.save()
            if(!newCourseCreated){
                res.send("Course is not created")
            }else{
                console.log(newCourseCreated)
            return res.send("Course Created")
            }
        })
    } catch (error) {
        console.log("Something went to wrong",error);
        res.send("Failed to create course")
    }
}

//update course

export const updateCourse=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    
    const {description,price,instructor}=req.body;

    const updatedCourse=await Course.findOneAndUpdate({_id:id},{description,price,instructor},{new:true})
    if(!updatedCourse){
        return res.send("Course is not updated")
    }
    console.log(updatedCourse)
    return res.send(updatedCourse)

}

//delete course

export const deleteCourse=async(req,res)=>{
    const id=req.params.id;

    const deletedCourse=await Course.deleteOne({_id:id})
    if(!deletedCourse){
        return res.send("Course not deleted")
    }
    res.send("Course deleted")
}