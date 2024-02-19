import React, { useState } from 'react';
import { useQuery } from "react-query" 
import axios from "axios";
import Form from 'react-bootstrap/Form';

const fetchStudents = async () => {
    const response = await fetch("http://localhost:8000/students");
    //console.log(response.ok);
    if (!response.ok){
        throw new Error('failed to fetch students');
    }
    return response.json();
  }

function SelectStudent({ setSelectedStudent }) {
    const { data: students, isLoading, isError } = useQuery('students', fetchStudents);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    const handleChangeStudent = (event) => {
        const student = event.target.value;
        setSelectedStudent(student); 
    }

  return (
    <Form.Select className="select" aria-label="Student-selection" onChange={handleChangeStudent}>
        <option>Select Student</option>
        {students.map((student,index) => (
            <option key = {index} value={student.id} >{student.name}</option>
        ))
        }
    </Form.Select>
  );
}

export default SelectStudent;