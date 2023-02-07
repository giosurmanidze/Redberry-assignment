
export const validateExp = (experienceData,setErrors) => {
  const REGEX_NAME = /^[ა-ჰ]*$/;
  const newErrors = {};
  experienceData.forEach((inputField, index) => {
    const validCheckPos = (!inputField?.position || !REGEX_NAME.test(inputField?.position) || inputField?.position.length < 2)
    const validCheckEmp =  (!inputField?.employer || !REGEX_NAME.test(inputField?.employer) || inputField?.employer.length < 2)
    const validCheckStart_date =   (!inputField?.start_date )
    const validCheckEnd_date =  (!inputField?.due_date )
    const validCheckDesc =  (!inputField?.description )
    if (validCheckPos) {
      newErrors[index] = { position: 'Invalid' };
    }
    if (validCheckEmp) {
      newErrors[index] = { ...newErrors[index], employer: 'Invalid' };
    }
    if (validCheckStart_date) {
      newErrors[index] = { ...newErrors[index], start_date: 'Invalid' };
    }
    if (validCheckEnd_date) {
      newErrors[index] = { ...newErrors[index], end_date: 'Invalid' };
    }
    if (validCheckDesc) {
      newErrors[index] = { ...newErrors[index], desc: 'Invalid' };
    }
  });
  setErrors(newErrors);
};