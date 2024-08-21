import express from 'express'
import userRoutes from './userRoutes.js';
import courseRoutes from './courseRoutes.js';
import instructorRoutes from './instructorRoutes.js';
import adminRoutes from './adminRoutes.js';
import assignmentRoutes from './assignmentRoutes.js';
import quizRoutes from './quizRoutes.js';
import studyplanRoutes from './studyplanRoutes.js';
import submissionRoutes from './submissionRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';

const v1Router = express.Router();


v1Router.use('/user',userRoutes)
v1Router.use('/course',courseRoutes)
v1Router.use('/studyplan',studyplanRoutes)
v1Router.use('/instructor',instructorRoutes)
v1Router.use('/admin',adminRoutes)
v1Router.use('/assignment',assignmentRoutes)
v1Router.use('/quiz',quizRoutes)
v1Router.use('/submission',submissionRoutes)
v1Router.use('/feedback',feedbackRoutes)
export default v1Router;