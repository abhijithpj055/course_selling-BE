import express from'express'
import {connectDb} from'../config/db.js'
import userRouter from'../routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import instructorRouter from '../routes/instructorRoutes.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
let corsOption={
  origin:'http://localhost:5173',
  credentials:true,
  optiomSuccessStatus:200
}

app.use(cors(corsOption))
// {
//   origin:"http://localhost:5173",
//   optionSuccessStatus:200
// }
app.use(cookieParser())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/instructor',instructorRouter)

connectDb()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})