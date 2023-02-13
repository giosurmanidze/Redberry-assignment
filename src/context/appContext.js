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
  image: "",
  about_me: "",
};

const inistialState = () => {
  const store = localStorage.getItem("store");
  return store ? JSON.parse(store) : initStore;
};

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [store, setStore] = useState(inistialState);
  const [responseData, setResponseData] = useState();


  const clearLocalStorage = () => {
    setStore({
      ...initStore,
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
    });
  };

  
  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

 

  // EVERY TIME THIS BUTTON IS CLICKED, FUNCTION FIRE AND ADDED NEW ONES 🔥
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
      return newStore;
    });
  };



  //HANDLECHANGE FUNCTIONS

   // GET IMAGE URL
   const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result;
        setStore((prev) => ({ ...prev, image: dataUrl }));
      };
    }
  };

  const handleInputChangeExp = (e, index, field) => {
    const newExperiences = [...store.experiences];
    newExperiences[index][field] = e.target.value;
    setStore((prev) => ({
      ...prev,
      experiences: newExperiences,
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



  // CHECKING VALUES FOR  EXPERIENCES AND EDUCATIONS
  const areAllExpEmpty = store.experiences.every((experience) => {
    return Object.values(experience).every((value) => value === "");
  });
  const areAllEduEmpty = store.educations.every((education) => {
    return Object.values(education).every((value) => value === "");
  });


  //PAGE ANIMATION VARIANTS
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw"
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };
  
  return (
    <StoreContext.Provider
      value={{
        store,
        areAllExpEmpty,
        areAllEduEmpty,
        clearLocalStorage,
        handleFileSelect,
        setStore,
        setExperienceInfo,
        setEducationInfo,
        handleInputChangeEdu,
        handleInputChangeExp,
        setResponseData,
        responseData,
        pageVariants
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
