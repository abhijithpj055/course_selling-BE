import express from "express"
import { signin,signup } from "../controllers/userController.js"
// import authenticateUser from "../middlewares/user-middleware.js"

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)

export default userRouter