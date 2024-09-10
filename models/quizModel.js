import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String},
    createdAt: { type: Date, default: Date.now },
    questions: [{
         text: { type: String, required: true },
         answers: [{
            text: { type: String, required: true },
            isCorrect: { type: Boolean, default: false } // Indicates if the answer is correct
          }],
      correctAnswerIndex: { type: Number, required: true } // Index of the correct answer in the answers array
    }],
    instructor:{type:mongoose.Types.ObjectId, ref:"Instructor"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, 
  });
  
 export const Quiz = mongoose.model("Quiz", quizSchema);