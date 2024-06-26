import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

function authenticateInstructor(req,res,next){
    const token=req.cookies.token

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        console.log(error);

        if(err) return res.send("Token not valid").status(403)
            console.log(req.user.role)
         if(req.user.role !== "instructor" && req.user.role !=="admin"){
            return res.send("Not authenticated")
         }
         next()
    })
}

export default authenticateInstructor