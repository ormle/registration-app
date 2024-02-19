import Course from "../models/courses.model.js";
import Student from "../models/students.model.js";

export const isStudentConflict = async function(query, payload) {
    try {
        const course = await Course.findById(query._id);
        //console.log("Want course: " + course.timeOfDay);
        const student = await Student.findById(payload._id);
        let conflict = false;
        const studentCourses = await getCourses(student);
        //console.log(studentCourses);
        studentCourses.courses.forEach(enrolledCourse => {
            if (enrolledCourse.timeOfDay === course.timeOfDay) { conflict = true; }
        });
        //console.log("conflict: " + conflict);
        return conflict;
    } catch (e) {
        throw Error("Error while checking course conflict");
    }
}

const getCourses = async function(student) {
    //console.log(student);
    const courses = await student.populate("courses");
    return courses;
}

export const getAvailCoursesToStudent = async function(query, payload){
    const studentCourses = payload;
    try {
        const availCourses = await Course.find().sort();
        const notEnrolledCourses = [];

        for (const course of availCourses) {
                // Check if the course is not present in the student's enrolled courses
            if (!studentCourses.some(enrolledCourse => enrolledCourse.id === course.id)) {
                // If not present, add it to the list of courses not enrolled
                notEnrolledCourses.push(course);
             }
        }
        return notEnrolledCourses;
        
    } catch (e) {
        throw Error("Error while comparing courses");
    }
}
