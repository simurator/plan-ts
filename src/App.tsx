import { BrowserRouter as Router } from "react-router-dom";
import SchoolScheduleApp from "./components/SchoolScheduleApp";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <SchoolScheduleApp />
      </div>
    </Router>
  );
}

export default App;
