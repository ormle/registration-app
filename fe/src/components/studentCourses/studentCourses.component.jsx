import React from 'react';
import { useQuery } from 'react-query';
import Table from 'react-bootstrap/Table';
import Button from "../Button/Button.component";


const fetchCoursesForStudent = async (studentId) => { 
    if (studentId === "Select Student") {
        return;
    }
    const url = `http://localhost:8000/enrollment/student/${studentId}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`failed to fetch courses for student`);
    }
    return response.json();
}

function StudentCourses({ selectedStudent}) {
    //console.log(selectedStudent);
    const { data: courses, isLoading, isError, refetch } = useQuery(['courses', selectedStudent], () => fetchCoursesForStudent(selectedStudent), {
        enabled: !!selectedStudent,
      });

    const handleEvent = (event) => {
        refetch();
    } 
    window.addEventListener('trigger', handleEvent);
    const event = new CustomEvent("trigger", {detail: 'HEY' });
    

    const handleUnenroll = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:8000/enrollment/${courseId}/student/${selectedStudent}`,
            { method: 'DELETE'});

            if (!response.ok) {
                throw new Error('Failed to unenroll student from course');
            }
            window.dispatchEvent(event);
            refetch(); //Refetch to update page
            
        } catch (err) {
            console.error("Error unenrolling student", err);
        }
    };

    if (selectedStudent === null || selectedStudent === "Select Student") {
        return <p>No courses to show</p>
    }
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    if (!courses || !courses.length){
        return <p>No courses available</p>
    }

  return (
    <Table striped className="table">
        
      <thead>
        <tr>
          <th>ID#</th>
          <th>Course Name</th>
          <th>Department</th>
          <th>Class Time</th>
          <th>Class Size</th>
          <th>Unenroll</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
            <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.courseName}</td>
                <td>{course.department}</td>
                <td>{course.timeOfDay}</td>
                <td>{course.classSize}/{course.maxClassSize}</td>
                <td><Button 
                    isEnrol={true}
                    onClick={() => handleUnenroll(course.id)}></Button></td>
            </tr>
        ))}
        
      </tbody>
    </Table>
  );
}

export default StudentCourses;