import React from "react";
import Resume from "../../components/Resume";
import arrowIcon from '../../assets/images/down-arrow.png'
import { Link } from "react-router-dom";
import "./style/styles.css";
import { motion } from "framer-motion";

const FinalPage = () => {


  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    localStorage.clear();
  };
  return (
    <motion.div className="resume__screen"
    initial={{width:0}}
    animate={{width:"100%"}}
    exit={{x:window.innerWidth, transition: {duration:0.1}}}

    >
      <div className="arrow__icon">
        <Link to="/" onClick={backAndRefresh}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="cv__info">
        <Resume
        />
      </div>
    </motion.div>
  );
};

export default FinalPage;
