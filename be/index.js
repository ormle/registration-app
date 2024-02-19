import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/student.route.js";
import courseRoutes from "./routes/course.route.js";
import enrolmentRoutes from "./routes/enrolment.route.js";
import { connectDB } from "./database/database.js";

const port = 8000;

const app = express();

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "app is running" });
});

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollment", enrolmentRoutes);

app.listen(port, () => {
  console.log(`App Listening on port ${port} `);
});