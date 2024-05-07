import express from'express'
import {connectDb} from'../config/db.js'
import userRouter from'../routes/userRoutes.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user',userRouter)

connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})