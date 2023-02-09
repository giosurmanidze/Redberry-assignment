import React from "react";
import Resume from "../../components/Resume";
import arrowIcon from '../../assets/images/down-arrow.png'
import { Link } from "react-router-dom";
import "./style/styles.css";

const FinalPage = () => {


  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    sessionStorage.clear();
  };
  return (
    <div className="resume__screen">
      <div className="arrow__icon">
        <Link to="/" onClick={backAndRefresh}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="cv__info">
        <Resume
          data={JSON.parse(sessionStorage.getItem("inputData"))}
          imgUrl={JSON.parse(sessionStorage.getItem("imgUrl"))}
          expData={JSON.parse(sessionStorage.getItem("experienceData"))}
          eduData={JSON.parse(sessionStorage.getItem("educationData"))}
        />
      </div>
    </div>
  );
};

export default FinalPage;
