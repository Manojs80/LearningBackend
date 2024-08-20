import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    description: {type: String},
    dueDate: { type: Date},
    instructor:{type:mongoose.Types.ObjectId, ref:"instructor"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course
  });
  
export const Assignment = mongoose.model("Assignment",assignmentSchema);