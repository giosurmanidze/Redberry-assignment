import "./styles/Resume.css";
import LOGO from "../assets/images/LOGO-12 1.png";
import EMAIL_ICON from "../assets/images/email-icon.png";
import PHONE_ICON from "../assets/images/phone-icon.png";

const Resume = ({ data, imgUrl, data2 }) => {
  return (
    <div className="resume__paper">
      <div className="header">
        <div className="header__infos">
          <div>
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
        <div className="experience__line"></div>
        <h3>გამოცდილება</h3>
        <p>
          {data2?.map((d) => {
            return d.position;
          })}
        </p>
      </div>

      <img src={LOGO} alt="logo" className="cv-logo" />
    </div>
  );
};

export default Resume;
