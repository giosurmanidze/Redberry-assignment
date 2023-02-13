import "./style/styles.css";
import { useNavigate } from "react-router-dom";
import { AGENCY, COMPANY_LOGO } from "../../reusableImports/imports";
import { motion } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../../context/appContext";

const HomePage = () => {
  const { pageVariants } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <motion.div
      className="landing__screen"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="landing__top">
        <img src={COMPANY_LOGO} className="landing__top--logo" />
        <div className="landing__top--line" />
      </div>
      <img src={AGENCY} className="agency__logo" />
      <button onClick={() => navigate("/general")}>რეზიუმეს დამატება</button>
    </motion.div>
  );
};

export default HomePage;
