import express from 'express'
import apiRouter from './routes/r-index.js'
import 'dotenv/config'
import { connectDB } from './configuration/db.js'
import cookieParser from "cookie-parser"; 
import cors from "cors";


 const app = express()
 const port = process.env.PORT
 app.use(cors({origin: 'http://localhost:5173',
  credentials:true,
 }))
 connectDB()
 
 app.use(express.json())
 app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',apiRouter )


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})