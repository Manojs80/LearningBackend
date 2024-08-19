import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    instructor:{type:mongoose.Types.ObjectId, ref:"instructor"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course
  });
  
export const Assignment = mongoose.model("Assignment",assignmentSchema);