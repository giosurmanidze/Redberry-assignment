import  { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./style/styles.css";
import { motion } from "framer-motion";
import { StoreContext } from "../../context/appContext";
import "../../components/styles/Resume.css";
import LOGO from "../../assets/images/LOGO-12 1.png";
import EMAIL_ICON from "../../assets/images/email-icon.png";
import PHONE_ICON from "../../assets/images/phone-icon.png";
import DELETE_ICON from "../../assets/images/delete--icon.png";
import {  useHref } from "react-router-dom";
import { arrowIcon } from "../../reusableImports/imports";
import InfoCard from "../../components/InfoCard";

const FinalPage = () => {
  const {responseData} = useContext(StoreContext) 
  const { clearLocalStorage, store } = useContext(StoreContext);
  const [isShowPop, setIsShowPop] = useState(true);

  const ref = useHref();


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
      <div className="resume__page">
      {ref === "/final-page" && (
        <Link to="/" className="cv__arrow" onClick={clearLocalStorage}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      )}
      <div className="resume__paper">
        <div className="inner__div">
          <div className="header">
            <div className="header__infos">
              <div className="basic_info">
                <h1>
                  {responseData?.name} {responseData?.surname}
                </h1>
                <p className="email__detail">
                  {responseData?.email && <img src={EMAIL_ICON} />}
                  {responseData?.email}
                </p>
                <p className="phone__detail">
                  {responseData?.phone_number && <img src={PHONE_ICON} />}
                  {responseData?.phone_number}
                </p>
              </div>
              <div className="about__me--info">
                {responseData?.about_me && <h3>ჩემ შესახებ</h3>}
                <p>{responseData?.about_me}</p>
              </div>
            </div>
            <img className="person__image" src={`https://resume.redberryinternship.ge${responseData?.image}`} />
          </div>
          <div className="experience">
            {responseData?.experiences && <div className="experience__line"></div>}
            <div className="info">
              {responseData?.experiences && <h3 className="head ">გამოცდილება</h3>}
              {responseData?.experiences?.map((info, i) => {
                return (
                  <InfoCard
                    key={i}
                    info_1={info.position}
                    info_2={info.employer}
                    info_3={info.start_date}
                    info_4={info.due_date}
                    info_5={info.description}
                  />
                );
              })}
            </div>
          </div>
          <div className="experience">
            {responseData?.educations && <div className="experience__line"></div>}

            <div className="info">
              {responseData?.educations && <h3 className="head">განათლება</h3>}

              {responseData?.educations?.map((info, i) => {
                return (
                  <InfoCard
                    key={i}
                    info_1={info.institute}
                    info_2={info.degree_id}
                    info_3=""
                    info_4={info.due_date}
                    info_5={info.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <img src={LOGO} alt="logo" className="cv-logo" />
      </div>
      {ref === "/final-page" && isShowPop && (
        <div className="popUp__card">
          <img
            src={DELETE_ICON}
            alt="delete"
            onClick={() => setIsShowPop(false)}
          />
          <h2>რეზიუმე წარმატებით გაიგზავნა 🎉</h2>
        </div>
      )}
    </div>
      </div>
    </motion.div>
  );
};

export default FinalPage;
