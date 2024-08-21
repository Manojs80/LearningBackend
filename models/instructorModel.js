import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        courses: [{ type: mongoose.Types.ObjectId, ref: "course" }],
    },
    { timestamps: true},
);

export const Instructor = mongoose.model("Instructor", instructorSchema);