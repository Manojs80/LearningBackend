import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to a User model 
        required: true 
      },
      feedbackText: { 
        type: String, 
        required: true 
      },
      rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
      },
      admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true 
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