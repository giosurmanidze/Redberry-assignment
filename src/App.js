import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreContextProvider from "./context/appContext";
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
      <StoreContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/general" element={<GeneralPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/edu" element={<EducationPage />} />
            <Route path="/final-page" element={<FinalPage />} />
          </Routes>
        </Router>
      </StoreContextProvider>
    </div>
  );
};

export default App;
