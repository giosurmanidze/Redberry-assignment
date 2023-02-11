import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/appContext";
import axios from "axios";
import {
  Resume,
  PageHeader,
  GREEN_ICON,
  RED_ICON,
  InputField2,
  SelectMenu,
  validateData,
} from "../../reusableImports/imports";
import { motion } from "framer-motion";


const EducationPage = () => {
  const { store, setEducationInfo, handleInputChangeEdu } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [degrees, setDegrees] = useState([]);

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
    const [newErrors] = validateData(store.educations, "edu");
    setErrors(newErrors);
  }, [store]);

  useEffect(() => {
    setErrors({});
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const [newErrors, isSubmited] = validateData(store.educations, "edu");
    setErrors(newErrors);
    const ErrorLen = Object.keys(isSubmited).length;

    if (!ErrorLen) {
      navigate("/final-page");
    }
  };

  return (
    <motion.div
      className="experience__screen"
      initial={{width:0}}
      animate={{width:"100%"}}
      exit={{x:window.innerWidth, transition: {duration:0.1}}}

    >
      <div className="general__screen--left">
        <PageHeader title={"განათლება"} status={3} />
        <form onSubmit={onSubmit}>
          {store?.educations?.map((data, index) => (
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
                      handleInputChangeEdu(e, index, "institute")
                    }
                  />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              </div>
              <div className="start__due--date">
                <div className="start__date">
                  <SelectMenu
                    value={data.degree_id}
                    handleInputChange={(e) =>
                      handleInputChangeEdu(e, index, "degree_id")
                    }
                    degrees={degrees}
                    errors={errors}
                    errorEl={errors && errors[index]?.degree_id}
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
                    onChange={(e) => handleInputChangeEdu(e, index, "due_date")}
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
                      handleInputChangeEdu(event, index, "description")
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
            onClick={setEducationInfo}
          >
            მეტი გამოცდილების დამატება
          </button>
          <div className="btns">
            <button type="button" onClick={() => navigate("/experience")}>
              უკან
            </button>
            <button type="submit" className="submit__btn" onClick={onSubmit}>
              დასრულდა
            </button>
          </div>
        </form>
      </div>
      <Resume />
    </motion.div>
  );
};

export default EducationPage;
