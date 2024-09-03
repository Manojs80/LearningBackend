import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema ({
  
  course: { type: mongoose.Schema.Types.ObjectId,
           ref: 'course' },
    activities: [{
        task: { 
        type: String, 
        required: true
         },
         description: { 
          type: String, 
          required: true 
        },
        dueDate: { type: Date },
    }],
    instructor:{type:mongoose.Types.ObjectId,
              ref:"instructor"},  
},
{ timestamps: true},

);
  
export const Assignment = mongoose.model("Assignment",assignmentSchema);