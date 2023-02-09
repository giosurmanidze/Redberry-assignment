import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  GeneralPage,
  ExperiencePage,
  EducationPage,
  FinalPage,
} from "./reusableImports/imports";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/edu" element={<EducationPage />} />
          <Route path="/final-page" element={<FinalPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
