import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  HomePage,
  GeneralPage,
  ExperiencePage,
  EducationPage,
  FinalPage,
} from "../reusableImports/imports";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/general" element={<GeneralPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/edu" element={<EducationPage />} />
        <Route path="/final-page" element={<FinalPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
