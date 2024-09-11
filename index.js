import express from 'express'
import apiRouter from './routes/r-index.js'
import 'dotenv/config'
import { connectDB } from './configuration/db.js'
import cookieParser from "cookie-parser"; 
import cors from "cors";

const port = process.env.PORT

 const app = express()
 
 
 app.use(
  cors({
      origin: ["https://learning-dashboard-eta.vercel.app", "http://localhost:5173"],
      credentials: true,
  })
);;
 

 connectDB()
 
 app.use(express.json());
 app.use(cookieParser());

 // Middleware to set cookies with specific attributes
 app.use((req, res, next) => {
  res.cookie('myCookie', 'value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure if in production
    sameSite: 'None', // Required for cross-origin requests
  });
  next();
});

 app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api',apiRouter )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




