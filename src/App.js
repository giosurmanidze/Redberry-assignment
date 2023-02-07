import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import GeneralPage from "./pages/general/GeneralPage.jsx";
import ExperiencePage from "./pages/experience/ExperiencePage.jsx";
import EducationPage from "./pages/education/EducationPage.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/edu" element={<EducationPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
