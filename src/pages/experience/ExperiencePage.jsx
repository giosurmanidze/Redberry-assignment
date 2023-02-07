import Resume from "../../components/Resume";
import arrowIcon from "../../assets/images/Vector.png";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSessionStorage from "../../hook/useSessionStorage";
import { validateExp } from "../../validation/validateExperience";
import "./style/styles.css";

const ExperiencePage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useSessionStorage({});
  const [experienceData, setExperienceData] = useSessionStorage(
    "experienceData",
    [
      {
        position: "",
        employer: "",
        start_date: "",
        due_date: "",
        description: "",
      },
    ]
  );

  // EVERY TIME THIS BUTTON IS CLICKED, FUNCTION FIRE 🔥
  const handleAddExperience = () => {
    setExperienceData([
      ...experienceData,
      {
        position: "",
        employer: "",
        start_date: "",
        due_date: "",
        description: "",
      },
    ]);
  };

  const handleInputChange = (e, index, field) => {
    const newInputFields = [...experienceData];
    newInputFields[index][field] = e.target.value;
    setExperienceData(newInputFields);
  };

  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    sessionStorage.clear();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateExp(experienceData, setErrors);
    if(!errors) {
       navigate("/experience")
    }
  };

  // THIS PIECE OF CODE TAKES CARE OF ERROR HANDLING FOR EVERY CHANGE
  useEffect(() => {
    setErrors(validateExp(experienceData, setErrors));
    validateExp(experienceData, setErrors);
  }, [experienceData]);

  useEffect(() => {
    setErrors({});
  }, []);


  return (
    <div className="experience__screen">
      <div className="arrow__icon">
        <Link to="/" onClick={backAndRefresh}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="general__screen--left">
        <PageHeader title={"ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ"} status={2} />
        <form onSubmit={onSubmit}>
          {experienceData.map((data, index) => (
            <div className="experience__form--container">
              <div className="postion--employer">
                <div className="position">
                  <h3
                    style={{
                      color: `${
                        errors &&
                        errors[index]?.position &&
                        errors[index].position
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    თანამდებობა
                  </h3>
                  <input
                    type="text"
                    placeholder="თანამდებობა"
                    name="position"
                    value={data.position}
                    onChange={(e) => handleInputChange(e, index, "position")}
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className="employer">
                  <h3
                    style={{
                      color: `${
                        errors &&
                        errors[index]?.employer &&
                        errors[index].employer
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    დამსაქმებელი
                  </h3>
                  <input
                    name="employer"
                    placeholder="დამსაქმებელი"
                    value={data.employer}
                    type="text"
                    onChange={(e) => handleInputChange(e, index, "employer")}
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              </div>
              <div className="start__due--date">
                <div className="start__date">
                  <h3
                    style={{
                      color: `${
                        errors &&
                        errors[index]?.start_date &&
                        errors[index].start_date
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    დაწყების რიცხვი
                  </h3>
                  <input
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    placeholder="MM / DD / YYY"
                    onChange={(e) => handleInputChange(e, index, "start_date")}
                  />
                </div>
                <div className="due__date">
                  <h3
                    style={{
                      color: `${
                        errors &&
                        errors[index]?.end_date &&
                        errors[index].end_date
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    დამთავრების რიცხვი
                  </h3>
                  <input
                    type="date"
                    name="due_date"
                    placeholder=" MM / DD / YYYY"
                    value={data.due_date}
                    onChange={(e) => handleInputChange(e, index, "due_date")}
                  />
                </div>
              </div>
              <div className="desc">
                <div>
                  <h3
                    style={{
                      color: `${
                        errors && errors[index]?.desc && errors[index].desc
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    აღწერა
                  </h3>
                  <textarea
                    type="text"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    name="description"
                    value={data.description}
                    onChange={(event) =>
                      handleInputChange(event, index, "description")
                    }
                  />
                </div>
              </div>
              <div className="devider--line"></div>
            </div>
          ))}
          <div className="btns">
            <button type="button" onClick={() => navigate("/general")}>
              უკან
            </button>
            <button type="submit" onClick={onSubmit}>
              შემდეგი
            </button>
          </div>
        </form>
        <button
          type="button"
          className="add__more"
          onClick={handleAddExperience}
        >
          მეტი გამოცდილების დამატება
        </button>
      </div>
      <Resume
        data={JSON.parse(sessionStorage.getItem("inputData"))}
        imgUrl={JSON.parse(sessionStorage.getItem("imgUrl"))}
        data2 = {JSON.parse(sessionStorage.getItem("experienceData"))}
      />
    </div>
  );
};

export default ExperiencePage;
