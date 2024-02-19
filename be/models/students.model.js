import mongoose, { Schema }from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        courses: [{type: mongoose.Schema.Types.ObjectId,
            ref: "Course"}]
    },
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;