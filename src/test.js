import { useState } from "react";
import { createContext } from react

const general_data = sessionStorage.getItem("inputData")

export const  appContext = createContext();

const store = {
   name:"",
   surname:"",
   email:"",
   phone_number:"",
   experiences: [
      {
       position:"",
       employer:"",
       start_date:"",
       due_date:"",
       description:""
      }
    ],
   educations: [
      {
       institute:"",
       degree:"",
       due_date:"",
       description:""
      }
    ],
   image:"",
   about_me:""
  }
