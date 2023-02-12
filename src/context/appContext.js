import { createContext, useEffect, useState } from "react";

const initStore = {
  name: "",
  surname: "",
  email: "",
  phone_number: "",
  experiences: [
    {
      position: "",
      employer: "",
      start_date: "",
      due_date: "",
      description: "",
    },
  ],
  educations: [
    {
      institute: "",
      due_date: "",
      description: "",
      degree_id: "",
    },
  ],
  // url: "",
  image:'',
  about_me: "",
};

const inistialState = () => {
  const store = localStorage.getItem("store");
  return store ? JSON.parse(store) : initStore;
};

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [store, setStore] = useState(inistialState);
  const [responseData, setResponseData] = useState()

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  const clearLocalStorage = () => {
    setStore(initStore);
  };



  // GET IMAGE URL
  const handleFileSelect = (event) => {

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        const dataUrl = reader.result;
        setStore((prev) => ({ ...prev, image: dataUrl}));
      };
      
    }
  };

  // EVERY TIME THIS BUTTON IS CLICKED, FUNCTION FIRE 🔥
  const setExperienceInfo = () => {
    setStore((prev) => {
      const newStore = {
        ...prev,
        experiences: [
          ...prev.experiences,
          {
            position: "",
            employer: "",
            start_date: "",
            due_date: "",
            description: "",
          },
        ],
      };
      localStorage.setItem("store", JSON.stringify(newStore));
      return newStore;
    });
  };
  const setEducationInfo = () => {
    setStore((prev) => {
      const newStore = {
        ...prev,
        educations: [
          ...prev.educations,
          {
            institute: "",
            due_date: "",
            description: "",
            degree_id: "",
          },
        ],
      };
      localStorage.setItem("store", JSON.stringify(newStore));
      return newStore;
    });
  };

  const handleInputChangeExp = (e, index, field) => {
    const newExperiences = [...store.experiences];
      newExperiences[index][field] = e.target.value;
    setStore((prev) => ({
      ...prev,
      experiences: newExperiences
    }));
  };


  const handleInputChangeEdu = (e, index, field) => {
    const newEducations = [...store.educations];
    newEducations[index][field] = e.target.value;

    setStore((prev) => ({
      ...prev,
      educations: newEducations,
    }));
  };

 


  return (
    <StoreContext.Provider
      value={{
        store,
        clearLocalStorage,
        handleFileSelect,
        setStore,
        setExperienceInfo,
        setEducationInfo,
        handleInputChangeEdu,
        handleInputChangeExp,
        setResponseData, responseData
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
