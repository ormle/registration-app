import express from "express";
import { enrolStudent, unEnrolStudent, getStudentCourses, getAvailStudentCourses} from "../controllers/enrolment.controller.js";

const router = express.Router();

router.get("/student/:studentId", getStudentCourses);
router.get("/course/:studentId", getAvailStudentCourses);
router.post("/:courseId/student/:studentId", enrolStudent);
router.delete("/:courseId/student/:studentId", unEnrolStudent);


export default router;