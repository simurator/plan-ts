import { BrowserRouter as Router } from "react-router-dom";
import SchoolScheduleContainer from "./components/SchoolScheduleContainer";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <SchoolScheduleContainer />
      </div>
    </Router>
  );
}

export default App;
