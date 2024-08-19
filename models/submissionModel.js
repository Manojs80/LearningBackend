import mongoose from 'mongoose';

 const submissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the Student
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true }, // Reference to the Assignment
    submissionDate: { type: Date, default: Date.now },
    content: String, // The actual submission content, e.g., text or a URL to a file
    grade: Number, // Optional, if you want to store the grade
    instructor:{type:mongoose.Types.ObjectId, ref:"instructor"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    });
  
 export const Submission = mongoose.model('Submission', submissionSchema);