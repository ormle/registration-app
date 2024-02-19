import { getCoursesFromRepository, addCourseToRepository, countCoursessInRepository} from "../repositories/course.repository.js";

/*To show a list of all the courses */
export const getCourses = async function (req, res) {
    try {
        const courses = await getCoursesFromRepository({});
        res.status(200).send(courses);
    } catch (e) {
        res.status(500).send(`failed to get list of courses`);
    }
}

/*TODO Show list of courses for that student? */

/* (NOT NEEDED)Create a course */
export const createCourse = async (req, res) => {
    const { body } = req;
    try {
        const courseCount = await countCoursessInRepository();
        const courseWithID = { id: courseCount, ...body, classSize: 0};
        const course = await addCourseToRepository(courseWithID);
        res.status(200).send(course);
    } catch (e) {
        res.status(500).send(`failed to create course`);
    }
}
