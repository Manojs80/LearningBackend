import express from 'express'
import apiRouter from './routes/r-index.js'
import 'dotenv/config'
import { connectDB } from './configuration/db.js'
import cookieParser from "cookie-parser"; 

 const app = express()
 const port = process.env.PORT

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