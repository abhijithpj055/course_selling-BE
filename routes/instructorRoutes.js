import express from "express"
import { getCourses,createCourse,deleteCourse,updateCourse } from "../controllers/courseController.js"
import upload from "../middlewares/upload-middleware.js"
import { getAllInstructors,removeInstructor,signin,signup } from "../controllers/instructorController.js"
import authenticateInstructor from "../middlewares/instructor-middleware.js"
import authenticateAdmin from "../middlewares/admin-middleware.js"

const instructorRouter=express.Router()

instructorRouter.post('/signup',signup)
instructorRouter.post('/signin',signin)

instructorRouter.get('/get-courses',getCourses)
instructorRouter.get('/get-instructors',getAllInstructors)
instructorRouter.delete('/delete-instructor/:id',authenticateInstructor,removeInstructor)

instructorRouter.post('/add-courses',authenticateAdmin,upload.single("image"),createCourse)
instructorRouter.put('/update-courses/:id',updateCourse)
instructorRouter.delete('/delete-courses/:id',deleteCourse)

export default instructorRouter;
