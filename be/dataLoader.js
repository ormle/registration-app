import fs from "fs";
import mongoose from "mongoose";
import Course from "./models/courses.model.js";
import Student from "./models/students.model.js";

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Read and parse the JSON data from your file
fs.readFile('courses.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }
  
  const jsonData = JSON.parse(data);

  // Insert courses
  Course.insertMany(jsonData)
  .then(docs => {
      console.log('Successfully inserted:', docs.length);
  })
  .catch(err => {
      console.error(err);
  })
  
});

fs.readFile('students.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data file:', err);
        return;
    }

    const jsonData = JSON.parse(data);  

    // Insert students
  Student.insertMany(jsonData)
    .then(docs => {
        console.log('Successfully inserted:', docs.length);
    })
    .catch(err => {
        console.error(err);
    })
});


