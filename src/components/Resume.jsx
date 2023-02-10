import "./styles/Resume.css";
import LOGO from "../assets/images/LOGO-12 1.png";
import EMAIL_ICON from "../assets/images/email-icon.png";
import PHONE_ICON from "../assets/images/phone-icon.png";
import DELETE_ICON from "../assets/images/delete--icon.png";
import { Link, useHref } from "react-router-dom";
import { useContext, useState } from "react";
import { arrowIcon } from "../reusableImports/imports";
import InfoCard from "./InfoCard";
import { StoreContext } from "../context/appContext";

const Resume = () => {
  const { clearLocalStorage, store } = useContext(StoreContext);
  const [isShowPop, setIsShowPop] = useState(true);
  const ref = useHref();

  return (
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
                  {store?.name} {store?.surname}
                </h1>
                <p className="email__detail">
                  {store?.email && <img src={EMAIL_ICON} />}
                  {store?.email}
                </p>
                <p className="phone__detail">
                  {store?.phone_number && <img src={PHONE_ICON} />}
                  {store?.phone_number}
                </p>
              </div>
              <div className="about__me--info">
                {store?.about_me && <h3>ჩემ შესახებ</h3>}
                <p>{store?.about_me}</p>
              </div>
            </div>
            <img className="person__image" src={store.image} />
          </div>
          <div className="experience">
            {store?.experiences && <div className="experience__line"></div>}
            <div className="info">
              {store?.experiences && <h3 className="head ">გამოცდილება</h3>}
              {store?.experiences?.map((info, i) => {
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
            {store?.educations && <div className="experience__line"></div>}

            <div className="info">
              {store?.educations && <h2 className="head">განათლება</h2>}

              {store?.educations?.map((info, i) => {
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
  );
};

export default Resume;
