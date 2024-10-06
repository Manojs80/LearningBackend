import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to a User model  
      }, 
      name: { 
        type: String, 
        required: true 
      },
      message: { 
        type: String, 
        required: true 
      },
      instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Instructor', // Reference to a User model  
      },
      course: { 
            type:mongoose.Types.ObjectId,
            ref:'course'
           
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      },
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);