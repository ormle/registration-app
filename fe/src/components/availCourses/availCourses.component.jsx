import React from 'react';
import { useQuery } from 'react-query';
import Table from 'react-bootstrap/Table';
import Button from "../Button/Button.component";


const fetchAvailCoursesForStudent = async (studentId) => { 
    if (studentId === "Select Student") {
        return;
    }
    const url = `http://localhost:8000/enrollment/course/${studentId}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`failed to fetch courses for student`);
    }
    //console.log(response.json());
    return response.json();
}

function AvailableCourses({ selectedStudent }) {
    //console.log(selectedStudent);
    const { data: availcourses, isLoading, isError, refetch } = useQuery(['availcourses', selectedStudent], () => fetchAvailCoursesForStudent(selectedStudent), {
        enabled: !!selectedStudent,
      });

    const event = new CustomEvent("trigger");
    const handleEvent = (event) => {
        refetch();
    } 

    window.addEventListener('trigger', handleEvent);
      const handleEnroll = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:8000/enrollment/${courseId}/student/${selectedStudent}`,
            { method: 'POST'});

            if (!response.ok) {
                throw new Error('Failed to enroll student from course');
            }
            window.dispatchEvent(event);
            refetch(); //Refetch to update page
        } catch (err) {
            console.error("Error unenrolling student", err);
        }
    };
    //console.log(courses);
    if (selectedStudent === null || selectedStudent === "Select Student") {
        return <p>No courses to show</p>
    }
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    if (!availcourses || !availcourses.length){
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
          <th>Enrol</th>
        </tr>
      </thead>
      <tbody>
        {availcourses.map(course => (
            <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.courseName}</td>
                <td>{course.department}</td>
                <td>{course.timeOfDay}</td>
                <td>{course.classSize}/{course.maxClassSize}</td>
                <td><Button 
                    isEnrol={false}
                    onClick={() => handleEnroll(course.id)}></Button></td>
            </tr>
        ))}
        
      </tbody>
    </Table>
  );
}

export default AvailableCourses;