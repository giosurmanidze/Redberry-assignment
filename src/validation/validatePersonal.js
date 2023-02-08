export const validatePersonal = (values) => {
    const response = {};
    const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.ge/;
    const REGEX_PHONE = /^\+995(79\d{7}|5\d{8})$/;
    const REGEX_NAME = /^[ა-ჰ]*$/;
  
    // username checking
    (!values?.name || !REGEX_NAME.test(values?.name) || values?.name.length < 2) ? response.name = "" : response.name = true;
  
    // lastname checking
    (!values?.surname || !REGEX_NAME.test(values?.surname) || values?.surname.length < 2) ? response.surname = "" : response.surname = true;
  
    //email checking
    (!values?.email || !REGEX_EMAIL.test(values?.email)) ? response.email = "" :  response.email = true;
  
    //phone chcking
    (!values?.phone_number || !REGEX_PHONE.test(values?.phone_number)) ? response.phone_number = "" : response.phone_number = true;
    
    //about me chcking (not required)
    (!values.about_me ? response.about_me = "" : response.about_me = true ) 
  
    return response;
  };
  