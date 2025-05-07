import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connect } from './config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { massageRouter } from './routing/massageRouter.js'
import { userRouter } from './routing/userRouter.js'


const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 4000

connect()
app.use('/api/', userRouter)
app.use('/api/message', massageRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})