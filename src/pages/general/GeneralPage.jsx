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
  const { store, setStore, handleFileSelect, pageVariants, formatPhoneNumber } =
    useContext(StoreContext);
  const [checkFormEl, setCheckFormEl] = useState({});
  const [imgErrMsg, setImgErrMsg] = useState("hide");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
    !store.image ? setImgErrMsg("show") : setImgErrMsg("hide");

    // FOR PHONE INPUT
    if (value.startsWith("+995")) {
      const formattedPhone = formatPhoneNumber(value);
      setStore((prev) => ({ ...prev, phone_number: formattedPhone }));
    }
  };

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
    !store.image ? setImgErrMsg("show") : setImgErrMsg("hide");
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
      <motion.div
        className="general__screen"
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
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
                <h3
                  style={{
                    color:
                      imgErrMsg === "show"
                        ? "red"
                        : imgErrMsg === "hide"
                        ? ""
                        : "",
                  }}
                >
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
                  className="general__area"
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
                  onKey={(e) => {
                    if (e.keyCode === 8 && store?.phone_number.length > 13) {
                      setStore({
                        ...store,
                        phone_number: store?.phone_number.slice(0, -1),
                      });
                    }
                  }}
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
        <Resume />
      </motion.div>
    </>
  );
};

export default GeneralPage;
