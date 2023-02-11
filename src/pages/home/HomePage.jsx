import "./style/styles.css";
import { useNavigate } from "react-router-dom";
import COMPANY_LOGO from "../../assets/images/LOGO-02 3.png";
import AGENCY from "../../assets/images/LOGO-40 1.png";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="landing__screen"
    initial={{width:0}}
    animate={{width:"100%"}}
    exit={{x:window.innerWidth, transition: {duration:0.1}}}
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
