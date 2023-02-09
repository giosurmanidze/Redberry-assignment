import "./style/styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../../hook/useSessionStorage";
import {
  Resume,
  PageHeader,
  GREEN_ICON,
  RED_ICON,
  validateExp,
  InputField2,
} from "../../reusableImports/imports";

const ExperiencePage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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

  // THIS PIECE OF CODE TAKES CARE OF ERROR HANDLING FOR EVERY CHANGE
  useEffect(() => {
    const [newErrors] = validateExp(experienceData);
    setErrors(newErrors);
  }, [experienceData]);

  useEffect(() => {
    setErrors({});
  }, []);

  // IF THE INPUTS DATA IS VALID AND INFORMATION IS POSTED THEN SHOW THIS CV
  const onSubmit = (e) => {
    e.preventDefault();
    const [newErrors, isSubmited] = validateExp(experienceData);
    setErrors(newErrors);
    const ErrorLen = Object.keys(isSubmited).length;
    return !ErrorLen && navigate("/edu");
  };

  return (
    <div className="experience__screen">
      <div className="general__screen--left">
        <PageHeader title={"ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ"} status={2} />
        <form onSubmit={onSubmit}>
          {experienceData.map((data, index) => (
            <div key={index} className="experience__form--container">
              <div className="postion--employer">
                <div className="position">
                  <InputField2
                    name="position"
                    title="თანამდებობა"
                    placeholder="თანამდებობა"
                    errors={errors}
                    errorEl={errors && errors[index]?.position}
                    value={data.position}
                    handleInputChange={(e) =>
                      handleInputChange(e, index, "position")
                    }
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className="employer">
                  <InputField2
                    name="employer"
                    title="დამსაქმებელი"
                    placeholder="დამსაქმებელი"
                    errors={errors}
                    errorEl={errors && errors[index]?.employer}
                    value={data.employer}
                    handleInputChange={(e) =>
                      handleInputChange(e, index, "employer")
                    }
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              </div>
              <div className="start__due--date">
                <div className="start__date">
                  <h3
                    style={{
                      color: `${
                        errors && errors[index]?.start_date === "Invalid"
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    {errors && errors[index]?.start_date === "Correct" && (
                      <img
                        src={GREEN_ICON}
                        alt="green"
                        className="green_icon green__icon"
                      />
                    )}
                    {errors && errors[index]?.start_date === "Invalid" && (
                      <img src={RED_ICON} alt="red" className="red__icon" />
                    )}
                    დაწყების რიცხვი
                  </h3>
                  <input
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    onChange={(e) => handleInputChange(e, index, "start_date")}
                    style={{
                      border: `${
                        errors && errors[index]?.start_date === "Invalid"
                          ? "1px solid red"
                          : errors && errors[index]?.start_date === "Correct"
                          ? "1px solid green"
                          : ""
                      }`,
                    }}
                  />
                </div>
                <div className="due__date">
                  <h3
                    style={{
                      color: `${
                        errors && errors[index]?.end_date === "Invalid"
                          ? "red"
                          : ""
                      }`,
                    }}
                  >
                    {errors && errors[index]?.end_date === "Correct" && (
                      <img
                        src={GREEN_ICON}
                        alt="green"
                        className="green_icon green__icon"
                      />
                    )}
                    {errors && errors[index]?.end_date === "Invalid" && (
                      <img src={RED_ICON} alt="red" className="red__icon" />
                    )}
                    დამთავრების რიცხვი
                  </h3>
                  <input
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    onChange={(e) => handleInputChange(e, index, "due_date")}
                    style={{
                      border: `${
                        errors && errors[index]?.end_date === "Invalid"
                          ? "1px solid red"
                          : errors && errors[index]?.end_date === "Correct"
                          ? "1px solid green"
                          : ""
                      }`,
                    }}
                  />
                </div>
              </div>
              <div className="desc">
                <div>
                  <h3
                    style={{
                      color: `${
                        errors && errors[index]?.desc === "Invalid" ? "red" : ""
                      }`,
                    }}
                  >
                    აღწერა
                  </h3>
                  <textarea
                    className="cv__textArea"
                    type="text"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    name="description"
                    value={data.description}
                    onChange={(event) =>
                      handleInputChange(event, index, "description")
                    }
                    style={{
                      border: `${
                        errors && errors[index]?.desc === "Invalid"
                          ? "1px solid red"
                          : errors && errors[index]?.desc === "Correct"
                          ? "1px solid green"
                          : ""
                      }`,
                    }}
                  />
                </div>
              </div>
              <div className="devider--line"></div>
            </div>
          ))}
          <button
            type="button"
            className="add__more"
            onClick={handleAddExperience}
          >
            მეტი გამოცდილების დამატება
          </button>
          <div className="btns">
            <button type="button" onClick={() => navigate("/general")}>
              უკან
            </button>
            <button type="submit" className="submit__btn" onClick={onSubmit}>
              შემდეგი
            </button>
          </div>
        </form>
      </div>
      <Resume
        data={JSON.parse(sessionStorage.getItem("inputData"))}
        imgUrl={JSON.parse(sessionStorage.getItem("imgUrl"))}
        expData={JSON.parse(sessionStorage.getItem("experienceData"))}
      />
    </div>
  );
};

export default ExperiencePage;
