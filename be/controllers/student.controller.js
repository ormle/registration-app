import { getStudentsFromRepository, addStudentToRepository, countStudentsInRepository } from "../repositories/student.repository.js";

/* Get a list of students */
export const getStudents = async (req, res) => {
    try {
        const students = await getStudentsFromRepository({});
        res.status(200).send(students);
    } catch (e) {
        res.status(500).send(`failed to fetch list of students`);
    }
}

/* Get a single student*/
export const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentsFromRepository({ id: id });
        res.status(200).send(student);
    } catch (e) {
        res.status(500).send(`failed to fetch student ${id}`);
    }
}

/* Create a new student */
export const createStudent = async (req, res) => {
    const { body } = req;
    try {
    const studentCount = await countStudentsInRepository();
    const studentWithID = { id: studentCount, ...body };
    const student = await addStudentToRepository(studentWithID);  
    res.status(200).send(student);
    } catch (e) {
        res.status(500).send(`failed to create student`);
    }
}