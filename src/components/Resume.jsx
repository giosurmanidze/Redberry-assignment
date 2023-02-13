import "./styles/Resume.css";
import { useContext } from "react";
import { StoreContext } from "../context/appContext";
import {
  PHONE_ICON,
  EMAIL_ICON,
  LOGO,
  InfoCard,
} from "../reusableImports/imports";

const Resume = () => {
  const { store } = useContext(StoreContext);

  return (
    <div className="resume__page">
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
              {store?.educations && <h3 className="head">განათლება</h3>}

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
    </div>
  );
};

export default Resume;
