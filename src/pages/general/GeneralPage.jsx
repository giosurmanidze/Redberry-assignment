import "./style/styles.css";
import Resume from "../../components/Resume";
import arrowIcon from "../../assets/images/Vector.png";
import PageHeader from "../../components/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validForm } from "../../validation/validForm1";
import useSessionStorage from "../../hook/useSessionStorage";
import InputField from "../../Layout/InputField";

const GeneralPage = () => {
  const [checkFormEl, setCheckFormEl] = useState({});
  const [imgUrl, setImgUrl] = useSessionStorage(null);
  const [imgErrMsg, setImgErrMsg] = useSessionStorage(false);
  const [storeInputDetails, setStoreInputDetails] = useSessionStorage(
    "inputData",
    {
      name: "",
      email: "",
      surname: "",
      about_me: "",
      phone_number: "",
    }
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStoreInputDetails({
      ...storeInputDetails,
      [e.target.name]: e.target.value,
    });
  };

  // EVERY TIMES DATA CHANGES VALIDATE FUNCTION  GET STARTED
  useEffect(() => {
    setCheckFormEl(validForm(storeInputDetails));
    validForm(storeInputDetails);
  }, [storeInputDetails]);

  useEffect(() => {
    setCheckFormEl({});
  }, []);

  // SUBMITED FORM AND CHECK IF DATA IS SUBMITED NAVOGATE NEXT PAGE
  const handleSubmit = (e) => {
    e.preventDefault();

    setCheckFormEl(validForm(storeInputDetails));
    if (
      checkFormEl.name &&
      checkFormEl.email &&
      checkFormEl.surname &&
      checkFormEl.phone_number &&
      imgUrl
    ) {
      navigate("/experience");
    }
  };

  // IF ARROW ON THE TOP LEFT IS CLICKED REFRESH ALL SAVED DATA
  const backAndRefresh = () => {
    sessionStorage.clear();
  };

  // GET IMAGE URL
  const handleFileSelect = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <div className="general__screen">
        <div className="arrow__icon">
          <Link to="/" onClick={backAndRefresh}>
            <img src={arrowIcon} alt="arrow" />
          </Link>
        </div>
        <div className="general__screen--left">
          <PageHeader title={"პირადი ინფო"} status={"1/3"} />
          <form onSubmit={handleSubmit}>
            <div className="general__screen--inputs">
              <div className="first__two--inputs">
                <div className="first--input input__container">
                  <InputField
                    name="name"
                    title="სახელი"
                    value={storeInputDetails?.name}
                    handleChange={handleChange}
                    data={storeInputDetails}
                    checkFormEl={checkFormEl.name}
                    placeholder="ანზორ"
                  />
                  <p>მინიმუმ 2 ასო, ქართული ასოები</p>
                </div>
                <div className="second--input input__container">
                  <InputField
                    name="surname"
                    title="გვარი"
                    value={storeInputDetails?.surname}
                    handleChange={handleChange}
                    data={storeInputDetails}
                    checkFormEl={checkFormEl.surname}
                    placeholder="მუმლაძე"
                  />
                  <p>მინიმუმ 2 ასო, ქართული ასოები</p>
                </div>
              </div>
            </div>
            <div className="last--inputs">
              <div className="image__upload">
                <h3 style={{ color: `${imgErrMsg ? "red" : ""}` }}>
                  პირადი ფოტოს ატვირთვა
                </h3>
                <input
                  id="file"
                  type="file"
                  name="image"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file">ატვირთვა</label>
              </div>
              <div className="about__me">
                <h3>ჩემ შესახებ (არასავალდებულო)</h3>
                <textarea
                  type="text"
                  name="about_me"
                  placeholder="ზოგადი ინფო შენ შესახებ"
                  value={storeInputDetails?.about_me}
                  onChange={handleChange}
                />
              </div>
              <div className="email--input input__container">
                <InputField
                  name="email"
                  title="ელ.ფოსტა"
                  value={storeInputDetails?.email}
                  handleChange={handleChange}
                  data={storeInputDetails}
                  checkFormEl={checkFormEl.email}
                  placeholder="anzorr666@redberry.ge"
                />
                <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
              </div>
              <div className="phone--input input__container">
                <InputField
                  name="phone_number"
                  title="მობილურის ნომერი"
                  value={storeInputDetails?.phone_number}
                  handleChange={handleChange}
                  data={storeInputDetails}
                  checkFormEl={checkFormEl.phone_number}
                  placeholder="+995 551 12 34 56"
                />
                <p>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
              </div>
              <button type="submit" className="next--btn">
                შემდეგი
              </button>
            </div>
          </form>
        </div>
        <Resume data={storeInputDetails} imgUrl={imgUrl} />
      </div>
    </>
  );
};

export default GeneralPage;
