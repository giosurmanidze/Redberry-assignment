import Resume from "../../components/Resume";
import arrowIcon from "../../assets/images/Vector.png";
import PageHeader from "../../components/PageHeader";
import ExperienceForm from "./experienceForm/ExperienceForm";
import { Link, useNavigate } from "react-router-dom";

const ExperiencePage = () => {
  const navigate = useNavigate();
  return (
    <div className="experience__screen">
      <div className="arrow__icon">
        <Link to="/">
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="general__screen--left">
        <PageHeader title={"ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ"} status={"2/3"} />
        <form>
          <ExperienceForm />
          <div className="btns">
            <button type="button" onClick={() => navigate("/general")}>
              უკან
            </button>
            <button type="submit">შემდეგი</button>
          </div>
        </form>
      </div>
      <Resume />
    </div>
  );
};

export default ExperiencePage;
