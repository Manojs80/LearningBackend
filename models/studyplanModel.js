import mongoose from "mongoose";

const studyplanSchema = new mongoose.Schema(
    {
        
          courseId:{
            type:mongoose.Types.ObjectId,
            ref:'course'
         },
        activities: [{
            task: { 
            type: String, 
            required: true
             },
            taskDescription: { 
              type: String, 
              required: true 
            },
            
        }],
        instructor:{type:mongoose.Types.ObjectId,
                  ref:"instructor"},  
    },
    { timestamps: true},
  )
export const Studyplan = mongoose.model("Studyplan", studyplanSchema);