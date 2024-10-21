import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    student: {  type:mongoose.Types.ObjectId, ref: 'User', required: true }, // Reference to the Student
    assignment: {  type:mongoose.Types.ObjectId, ref: 'Assignment', required: true }, // Reference to the Assignment
    submissionDate: { type: Date, default: Date.now },
    task: {  
        type: String,
        required: true,
    },
    content: {  
        type: String,
        required: true,
    }, // The actual submission content, e.g., text or a URL to a file
    score: { type: Number, default: null },// Optional, if you want to store score
    instructor: {  type:mongoose.Types.ObjectId, ref: 'Instructor' }, // Fixed here
    course: { type:mongoose.Types.ObjectId, ref: 'Course', required: true },
}, 
{ timestamps: true });

export const Submission = mongoose.model('Submission', submissionSchema);
