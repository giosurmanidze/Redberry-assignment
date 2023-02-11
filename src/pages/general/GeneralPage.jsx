import "./style/styles.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Resume,
  PageHeader,
  InputField,
  validatePersonal,
} from "../../reusableImports/imports";
import { StoreContext } from "../../context/appContext";
import { motion } from "framer-motion";


const GeneralPage = () => {
  const { handleChange, store, handleFileSelect } = useContext(StoreContext);
  const [checkFormEl, setCheckFormEl] = useState({});
  const [imgErrMsg, setImgErrMsg] = useState("hide");

  const navigate = useNavigate();

  // EVERY TIMES DATA CHANGES VALIDATE FUNCTION  GET STARTED
  useEffect(() => {
    setCheckFormEl(validatePersonal(store));
    validatePersonal(store);
    !store.image ? setImgErrMsg("show") : setImgErrMsg("hide");
  }, [store]);

  useEffect(() => {
    setCheckFormEl({});
    !store.image && setImgErrMsg("hide");

  }, []);

  // SUBMITED FORM AND CHECK IF DATA IS SUBMITED NAVOGATE NEXT PAGE
  const handleSubmit = (e) => {
    e.preventDefault();

    setCheckFormEl(validatePersonal(store));
    if (!store.image) {
      setImgErrMsg("show");
    } else {
      setImgErrMsg("hide");
    }
    if (
      checkFormEl.name &&
      checkFormEl.email &&
      checkFormEl.surname &&
      checkFormEl.phone_number &&
      store.image
    ) {
      navigate("/experience");
    }
  };

  return (
    <>
      <motion.div className="general__screen"
        initial={{width:0}}
        animate={{width:"100%"}}
        exit={{x:window.innerWidth, transition: {duration:0.1}}}

      >
        <div className="general__screen--left">
          <PageHeader title={"პირადი ინფო"} status={1} />
          <form onSubmit={handleSubmit}>
            <div className="general__screen--inputs">
              <div className="first__two--inputs">
                <div className="first--input input__container">
                  <InputField
                    name="name"
                    title="სახელი"
                    value={store?.name}
                    handleChange={handleChange}
                    checkFormEl={checkFormEl.name}
                    placeholder="ანზორ"
                  />
                  <p>მინიმუმ 2 ასო, ქართული ასოები</p>
                </div>
                <div className="second--input input__container">
                  <InputField
                    name="surname"
                    title="გვარი"
                    value={store?.surname}
                    handleChange={handleChange}
                    checkFormEl={checkFormEl.surname}
                    placeholder="მუმლაძე"
                  />
                  <p>მინიმუმ 2 ასო, ქართული ასოები</p>
                </div>
              </div>
            </div>
            <div className="last--inputs">
              <div className="image__upload">
                <h3 style={{ color: imgErrMsg === "show" ? "red" : "" }}>
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
                  value={store?.about_me}
                  onChange={handleChange}
                />
              </div>
              <div className="email--input input__container">
                <InputField
                  name="email"
                  title="ელ.ფოსტა"
                  value={store?.email}
                  handleChange={handleChange}
                  checkFormEl={checkFormEl.email}
                  placeholder="anzorr666@redberry.ge"
                />
                <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
              </div>
              <div className="phone--input input__container">
                <InputField
                  name="phone_number"
                  title="მობილურის ნომერი"
                  value={store?.phone_number}
                  handleChange={handleChange}
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
        <Resume
        />
      </motion.div>
    </>
  );
};

export default GeneralPage;
