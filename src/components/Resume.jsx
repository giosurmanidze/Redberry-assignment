import "./styles/Resume.css";
import LOGO from "../assets/images/LOGO-12 1.png";
import EMAIL_ICON from "../assets/images/email-icon.png";
import PHONE_ICON from "../assets/images/phone-icon.png";
import DELETE_ICON from "../assets/images/delete--icon.png";
import { Link, useHref } from "react-router-dom";
import { useState } from "react";
import { arrowIcon } from "../reusableImports/imports";

const Resume = ({ data, imgUrl, expData, eduData }) => {
  const [isShowPop, setIsShowPop] = useState(true);
  const ref = useHref();

  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    sessionStorage.clear();
  };
  return (
    <div className="resume__page">
      {ref === "/final-page" && (
        <Link to="/" className="cv__arrow" onClick={backAndRefresh}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      )}
      <div className="resume__paper">
        <div className="inner__div">
          <div className="header">
            <div className="header__infos">
              <div className="basic_info">
                <h1>
                  {data?.name} {data?.surname}
                </h1>
                <p className="email__detail">
                  {data?.email && <img src={EMAIL_ICON} />}
                  {data?.email}
                </p>
                <p className="phone__detail">
                  {data?.phone_number && <img src={PHONE_ICON} />}
                  {data?.phone_number}
                </p>
              </div>
              <div className="about__me--info">
                {data?.about_me && <h3>ჩემ შესახებ</h3>}
                <p>{data?.about_me}</p>
              </div>
            </div>
            <img className="person__image" src={imgUrl} />
          </div>
          <div className="experience">
            {expData && <div className="experience__line"></div>}

            <div className="info">
              {expData && <h3 className="head ">გამოცდილება</h3>}

              {expData?.map((info, i) => {
                return (
                  <div key={i} className="experience__container">
                    <div className="pos__date">
                      <h3>{`${info.position}${info.position && ","}  ${
                        info.employer
                      }`}</h3>
                      <h2>{`${info.start_date}${info.start_date && " -"} ${
                        info.due_date
                      }`}</h2>
                    </div>
                    <p>{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="experience">
            {eduData && <div className="experience__line"></div>}

            <div className="info">
              {eduData && <h2 className="head">განათლება</h2>}

              {eduData?.map((info, i) => {
                return (
                  <div key={i} className="education__container">
                    <div className="pos__date">
                      <h3>{`${info.institute}${info.institute && ","}  ${
                        info.degree
                      }`}</h3>
                      <h2>{`${info.due_date}`}</h2>
                    </div>
                    <p>{info.description}</p>
                  </div>
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
  );
};

export default Resume;
