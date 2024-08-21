import mongoose from "mongoose";

const studyplanSchema = new mongoose.Schema(
    {
        course: { 
            type: String,
            required: true
          },
        activities: [{
            task: { 
            type: Number, 
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
        user: { type: mongoose.Schema.Types.ObjectId, 
            ref: "User" },   
    },
    { timestamps: true},
  )
export const Studyplan = mongoose.model("Studyplan", studyplanSchema);