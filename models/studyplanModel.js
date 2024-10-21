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
            videoUrl: { // Add video URL field here
              type: String,
              required: true // Set to true if the URL is mandatory
          },
          pdfNote: { // Field for PDF note
              type: String,
              required: false // Set to true if the URL is mandatory
          }
         
            
        }],
        instructor:{type:mongoose.Types.ObjectId,
                  ref:"instructor"},  
    },
    { timestamps: true},
  )
export const Studyplan = mongoose.model("Studyplan", studyplanSchema);