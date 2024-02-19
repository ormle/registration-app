import Student from "../models/students.model.js";

export const getStudentsFromRepository = async function (query) {
    try {
        const students = await Student.find(query).sort({ time: -1});;
        return students;
    } catch (e) {
        throw Error("Error while fetching students");
    }
};

export const addStudentToRepository = async function (payload) {
    try {
        const addedStudent = new Student(payload);
        const savedStudent = await addedStudent.save();
        return savedStudent;
    } catch (e){
        throw Error("Error while adding student");
    }
};

export const enrolStudent = async function(student, courseId) {
    try {
        const enrolledStudent = await Student.findByIdAndUpdate(
            student,
            { $push: { course: courseId} },
            { new: true, useFindAndModify: false}
        );
        return enrolledStudent;
    } catch (e) {
        throw Error("Error while enrolling student");
    }
}


export const addCourseToStudentRepository = async function (query, payload) {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            query._id,
            {$push: {courses: payload._id}},
            { new: true}
        );
        return updatedStudent;
    } catch (e) {
        throw Error("Error while updating student");
    }
}

export const countStudentsInRepository = async function () {
    try {
        let count = await Student.countDocuments();
        return count+1;
    } catch (e) {
        throw Error("Error while counting students in repository");
    }
};

export const removeCourseFromStudentRepository = async function (query, payload) { 
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            query._id,
            { $pull: {courses: payload._id}},
            {new: true}
        ).lean();
        return updatedStudent;
    } catch (e) {
        throw Error("Error while removing student course");
    }
}

export const getStudentCoursesFromStudent = async function (query, payload){
    try {
        //console.log(query);
        const student = await Student.findById(query._id);
        //consol
        const studentCourses = await getCourses(student);
        //console.log("Student Courses: " +studentCourses);
        return studentCourses;
    } catch (e){
        throw Error("Error while fetching student courses");
    }
}

const getCourses = async function(student) {
    //console.log(student);
    const courses = await student.populate("courses");
    return courses.courses;
}