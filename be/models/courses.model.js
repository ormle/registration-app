import mongoose , { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        courseName: {type: String, required: true},
        department: {type: String, required: true},
        timeOfDay: {type: String, required: true},
        maxClassSize: {type: Number, required: true},
        classSize: {type: Number, required: true},
        enrolled: [{type: mongoose.Schema.Types.ObjectId,
                    ref: "Student"}]
    },
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;