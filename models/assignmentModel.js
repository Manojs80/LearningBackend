import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    description: {type: String, required: true },
    dueDate: { type: Date },
    instructor:{type:mongoose.Types.ObjectId, ref:"Instructor"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' }    
  },
  {timestamps: true },
);
  
export const Assignment = mongoose.model("Assignment",assignmentSchema);