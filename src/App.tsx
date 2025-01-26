import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { SchoolDay } from "./components/Models";
import SchoolScheduleApp from "./components/SchoolScheduleApp";

const initialState: SchoolDay[] = [
  {
    day: "Monday",
    lessons: [
      {
        id: 1,
        subject: "Math",
        teacher: { id: 1, firstName: "Jan", lastName: "Kowalski" },
        startTime: "08:00",
        endTime: "09:30",
        classroom: "101",
      },
    ],
  },
  { day: "Tuesday", lessons: [] },
  { day: "Wednesday", lessons: [] },
  { day: "Thursday", lessons: [] },
  { day: "Friday", lessons: [] },
];

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <SchoolScheduleApp initialState={initialState} />
      </div>
    </Router>
  );
}

export default App;
