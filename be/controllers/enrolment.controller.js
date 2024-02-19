import { addCourseToStudentRepository, getStudentsFromRepository, removeCourseFromStudentRepository, getStudentCoursesFromStudent} from "../repositories/student.repository.js";
import { getCoursesFromRepository, addStudentToCourseRepository, getCourseStudentsFromRepository, removeStudentFromCourseRepository} from "../repositories/course.repository.js";
import { isStudentConflict, getAvailCoursesToStudent } from "../repositories/enrolment.repository.js";

/* When click enrol button, add student the the courses class list
*  Also increase the class size of the course */
export const enrolStudent = async (req, res) => {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
   //console.log(studentId, courseId);
    try {
        const student = await getStudentsFromRepository({ id: studentId });
        const course = await getCoursesFromRepository({ id: courseId });

        if (course[0].maxClassSize === course[0].classSize){
            res.status(400).send(`Maximum class capacity reached`);
            return;
        }

        //Check if already enrolled
        const isEnrolled = course[0].enrolled.includes(student[0]._id);
        if (isEnrolled) {
            res.status(400).send(`Student already enrolled`);
            return;
        }
        console.log("isEnrolled: " + isEnrolled);
        //Check if have a class at that time already
        let isConflict = await isStudentConflict(course[0], student[0]);
        console.log("isConflict: "+ isConflict);
        if (isConflict) {
            res.status(400).send(`Student has a time conflict`);
            return;
        }
        

        //console.log(student, course);

        const updatedCourse = await addStudentToCourseRepository(course[0], student[0]);
        const updatedStudent = await addCourseToStudentRepository(student[0], course[0]);
        res.status(200).send(updatedCourse);
    }catch (e) {
        res.status(500).send(`failed to update course`);
    }
}

/* Get a list of all the students enrolled in a course*/
export const getEnrolledStudents = async (req, res) => {
    try {
        const students = await getCourseStudentsFromRepository();
        res.status(200).send(students);
    } catch (e) {
        res.status(500).send(`failed to get students`);
    }
}


/* When unenrol button click, remove student from class list
*  Decrease # of students enroled in class*/
export const unEnrolStudent = async (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    try {
        const course = await getCoursesFromRepository({id: courseId});
        const student = await getStudentsFromRepository({ id: studentId });

        const updatedCourse = await removeStudentFromCourseRepository(course[0], student[0]);
        const updatedStudent = await removeCourseFromStudentRepository(student[0], course[0]);
        res.status(200).send(updatedCourse);
    } catch (e) {
        res.status(500).send(`failed to remove student from course ${courseId}`);
    }
}

export const getStudentCourses = async (req, res) => {
    const studentId = req.params.studentId;
    try {
        const student = await getStudentsFromRepository({ id: studentId });
        const studentCourses = await getStudentCoursesFromStudent(student[0]);
        //console.log("courses: " + studentCourses);
        res.status(200).send(studentCourses);
    } catch (e) {
        res.status(500).send(`failed to get student courses`);
    }
}

export const getAvailStudentCourses = async function (req, res) {
    const studentId = req.params.studentId;
    try {
        const student = await getStudentsFromRepository({ id: studentId});
        const studentCourses = await getStudentCoursesFromStudent(student[0]);
        const availCoursesToStudent = await getAvailCoursesToStudent(student, studentCourses);
        //console.log(availCoursesToStudent);
        res.status(200).send(availCoursesToStudent);
    } catch (e) {
        res.status(500).send(`failed to get courses available to student`);
    }
}