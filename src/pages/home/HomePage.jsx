import "./style/styles.css";
import { useNavigate } from "react-router-dom";
import { AGENCY, COMPANY_LOGO } from "../../reusableImports/imports";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="landing__screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.75, ease:'easeOut'}}
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
