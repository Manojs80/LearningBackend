import mongoose from "mongoose";

const studyplanSchema = new mongoose.Schema(
    {
        course: { 
            type: String,
            required: true
          },
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
            completed: { 
              type: Boolean, 
              default: false 
            },
        }],
        instructor:{type:mongoose.Types.ObjectId,
                  ref:"instructor"},  
    },
    { timestamps: true},
  )
export const Studyplan = mongoose.model("Studyplan", studyplanSchema);