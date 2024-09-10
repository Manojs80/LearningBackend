import mongoose from 'mongoose';

const quizresponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  responses: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: true }
  }],
  score: { type: Number, default: 0 }
}, { timestamps: true });

export const QuizResponse = mongoose.model('QuizResponse', quizresponseSchema);
