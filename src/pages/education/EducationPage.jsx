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
  const { store, setEducationInfo, handleInputChangeEdu, setResponseData } =
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

  const checkDegreeId = (val) => {
    switch (val) {
      case "საშუალო სკოლის დიპლომი":
        return 1;
      case "ზოგადსაგანმანათლებლო დიპლომი":
        return 2;
      case "ბაკალავრი":
        return 3;
      case "მაგისტრი":
        return 4;
      case "დოქტორი":
        return 5;
      case "ასოცირებული ხარისხი":
        return 6;
      case "სტუდენტი":
        return 7;
      case "კოლეჯი(ხარისიხს გარეშე)":
        return 8;
      case "სხვა":
        return 9;
      default:
        return 0;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const [newErrors, isSubmited] = validateData(store.educations, "edu");
    setErrors(newErrors);
    const ErrorLen = Object.keys(isSubmited).length;

    const updatedStore = {
      ...store,
      educations: store.educations?.map((data) => {
        return {
          ...data,
          degree_id: checkDegreeId(data.degree_id),
        };
      }),
    };

const formData = new FormData();

formData.append("name", updatedStore.name);
formData.append("surname", updatedStore.surname);
formData.append("email", updatedStore.email);
formData.append("phone_number", updatedStore.phone_number);

updatedStore.experiences.forEach((experience, index) => {
  formData.append(`experiences[${index}][position]`, experience.position);
  formData.append(`experiences[${index}][employer]`, experience.employer);
  formData.append(
    `experiences[${index}][start_date]`,
    experience.start_date
  );
  formData.append(`experiences[${index}][due_date]`, experience.due_date);
  formData.append(
    `experiences[${index}][description]`,
    experience.description
  );
});

updatedStore.educations.forEach((education, index) => {
  formData.append(`educations[${index}][institute]`, education.institute);
  formData.append(`educations[${index}][due_date]`, education.due_date);
  formData.append(
    `educations[${index}][description]`,
    education.description
  );
  formData.append(`educations[${index}][degree_id]`, education.degree_id);
});

fetch(updatedStore.image)
  .then((response) => response.blob())
  .then((blob) => {
    formData.append("image", blob, "image.png");
    axios({
      method: "POST",
      url: "https://resume.redberryinternship.ge/api/cvs",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (!ErrorLen && response.status === 201) {
          navigate("/final-page");
        }
        setResponseData(response.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  });
formData.append("about_me", updatedStore.about_me);


   
  };

  return (
    <motion.div
      className="experience__screen"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
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
      <Resume data={store}/>
    </motion.div>
  );
};

export default EducationPage;
