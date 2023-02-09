import Resume from "../../components/Resume";
import arrowIcon from "../../assets/images/Vector.png";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSessionStorage from "../../hook/useSessionStorage";
import GREEN_ICON from "../../assets/images/done-green-circle.png";
import RED_ICON from "../../assets/images/warning-red-circle.png";
import InputField2 from "../../Layout/InputField2";
import axios from "axios";
import SelectMenu from "../../Layout/SelectMenu";
import { validateEdu } from "../../validation/validateEdu";
import DELETE_ICON from "../../assets/images/delete--icon.png";

const EducationPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [degrees, setDegrees] = useSessionStorage([]);
  const [educationData, setEducationData] = useSessionStorage("educationData", [
    {
      institute: "",
      degree: "",
      due_date: "",
      description: "",
    },
  ]);

  // EVERY TIME THIS BUTTON IS CLICKED, FUNCTION FIRE 🔥
  const handleAddEcudation = () => {
    setEducationData([
      ...educationData,
      {
        institute: "",
        degree: "",
        due_date: "",
        description: "",
      },
    ]);
  };

  const handleInputChange = (e, index, field) => {
    const newInputFields = [...educationData];
    newInputFields[index][field] = e.target.value;
    setEducationData(newInputFields);
  };

  // GET DEGREES DATA FROM AN API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://resume.redberryinternship.ge/api/degrees"
        );
        setDegrees(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // THIS PIECE OF CODE TAKES CARE OF ERROR HANDLING FOR EVERY CHANGE
  useEffect(() => {
    const [newErrors] = validateEdu(educationData);
    setErrors(newErrors);
  }, [educationData]);

  useEffect(() => {
    setErrors({});
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const [newErrors, isSubmited] = validateEdu(educationData);
    setErrors(newErrors);
    const ErrorLen = Object.keys(isSubmited).length;

    if (!ErrorLen) {
      navigate("/final-page");
    }
  };

  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    sessionStorage.clear();
  };
  return (
    <div className="experience__screen">
      <div className="arrow__icon">
        <Link to="/" onClick={backAndRefresh}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="general__screen--left">
        <PageHeader title={"ᲒᲐᲜᲐᲗᲚᲔᲑᲐ"} status={3} />
        <form onSubmit={onSubmit}>
          {educationData.map((data, index) => (
            <div key={index} className="experience__form--container">
              <div className="postion--employer">
                <div className="position">
                  <InputField2
                    name="institute"
                    title="სასწავლებელი"
                    placeholder="სასწავლებელი"
                    errors={errors}
                    errorEl={errors && errors[index]?.institute}
                    value={data.institute}
                    handleInputChange={(e) =>
                      handleInputChange(e, index, "institute")
                    }
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              </div>
              <div className="start__due--date">
                <div className="start__date">
                  <SelectMenu
                    value={data.degree}
                    handleInputChange={(e) =>
                      handleInputChange(e, index, "degree")
                    }
                    degrees={degrees}
                    errors={errors}
                    errorEl={errors && errors[index]?.degree}
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
                        errors && errors[index]?.description === "Invalid"
                          ? "red"
                          : ""
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
                        errors && errors[index]?.description === "Invalid"
                          ? "1px solid red"
                          : errors && errors[index]?.description === "Correct"
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
            onClick={handleAddEcudation}
          >
            მეტი გამოცდილების დამატება
          </button>
          <div className="btns">
            <button type="button" onClick={() => navigate("/experience")}>
              უკან
            </button>
            <button type="submit" onClick={onSubmit}>
              დამახსოვრება
            </button>
          </div>
        </form>
      </div>
      <Resume
        data={JSON.parse(sessionStorage.getItem("inputData"))}
        imgUrl={JSON.parse(sessionStorage.getItem("imgUrl"))}
        expData={JSON.parse(sessionStorage.getItem("experienceData"))}
        eduData={JSON.parse(sessionStorage.getItem("educationData"))}
      />
    </div>
  );
};

export default EducationPage;
