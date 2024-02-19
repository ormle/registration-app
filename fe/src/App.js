import React, { useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SelectStudent from "./components/selectStudent/selectStudent.component";
import StudentCourses from "./components/studentCourses/studentCourses.component";
import AvailableCourses from "./components/availCourses/availCourses.component";

const queryClient = new QueryClient();

function App() {
  const [selectedStudent, setSelectedStudent] = useState(0);

  return (
    <QueryClientProvider client={queryClient} >
      <div className="App">
        <header>
          <h1>Course Registration</h1>
        </header>
        <SelectStudent setSelectedStudent = {setSelectedStudent}  />
        <h2>Student Courses:</h2>
        <StudentCourses selectedStudent = {selectedStudent} />
        <h2>Available Courses:</h2>
        <AvailableCourses selectedStudent={selectedStudent}/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
