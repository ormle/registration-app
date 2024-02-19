import Course from "../models/courses.model.js";

export const getCoursesFromRepository = async function (query) {
    try {
        const courses = await Course.find(query).sort({ time: -1});;
        return courses;
    } catch (e) {
        throw Error("Error while fetching courses");
    }
}

export const addCourseToRepository = async function (payload) {
    try {
        const addedCourse = new Course(payload);
        const savedCourse = await addedCourse.save();
        return savedCourse;
    } catch (e) {
        throw Error("Error while adding course");
    }
}

export const countCoursessInRepository = async function () {
    try {
        let count = await Course.countDocuments();
        return count+1;
    } catch (e) {
        throw Error("Error while counting courses in repository");
    }
};

export const addStudentToCourseRepository = async function(query, payload) {
    //console.log(query, payload);
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            query._id,
            { $push: { enrolled: payload._id}, 
              $inc: { classSize: 1}},
            { new: true, useFindAndModify: false},
        );
        console.log(updatedCourse);
        return updatedCourse;
    } catch (e) {
        throw Error("Error while adding student to course");
    }
}

export const getCourseStudentsFromRepository = async function(query, payload) {
    try{
        const students = await Course.findById(query._id).populate("enrolled", "-_id -id -courseName -department -timeOfDay -classSize");
        return students;
    } catch (e) {
        throw Error("Error while getting students");
    }
}

export const removeStudentFromCourseRepository = async function(query, payload) {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            query._id,
            { $pull: { enrolled: payload._id},
              $inc: { classSize: -1}},
            { new: true, useFindAndModify: false},
        );
        console.log(updatedCourse);
        return updatedCourse;
    }catch (e) {
        throw Error("Error while removing student from course");
    }
}
