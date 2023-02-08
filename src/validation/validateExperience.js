export const validateExp = (experienceData, setErrors) => {
  const newErrors = {};
  experienceData.forEach((inputField, index) => {
    const validCheckPos =
      !inputField?.position || inputField?.position.length < 2;
    const validCheckEmp =
      !inputField?.employer || inputField?.employer.length < 2;
    const validCheckStart_date = !inputField?.start_date;
    const validCheckEnd_date = !inputField?.due_date;
    const validCheckDesc = !inputField?.description;
    if (validCheckPos) {
      newErrors[index] = { position: "Invalid" };
    } else {
      newErrors[index] = { ...newErrors[index], position: "Correct" };
    }
    if (validCheckEmp) {
      newErrors[index] = { ...newErrors[index], employer: "Invalid" };
    } else {
      newErrors[index] = { ...newErrors[index], employer: "Correct" };
    }
    if (validCheckStart_date) {
      newErrors[index] = { ...newErrors[index], start_date: "Invalid" };
    } else {
      newErrors[index] = { ...newErrors[index], start_date: "Correct" };
    }
    if (validCheckEnd_date) {
      newErrors[index] = { ...newErrors[index], end_date: "Invalid" };
    } else {
      newErrors[index] = { ...newErrors[index], end_date: "Correct" };
    }
    if (validCheckDesc) {
      newErrors[index] = { ...newErrors[index], desc: "Invalid" };
    } else {
      newErrors[index] = { ...newErrors[index], desc: "Correct" };
    }
  });
  setErrors(newErrors);
};
