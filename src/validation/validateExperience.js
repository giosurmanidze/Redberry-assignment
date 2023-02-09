const validateExp = (experienceData) => {
  const newErrors = {};
  const isSubmited = {};
  experienceData?.forEach((inputField, index) => {
    const errorKeys = [
      "position",
      "employer",
      "start_date",
      "end_date",
      "desc",
    ];
    const validations = [
      !inputField?.position || inputField?.position.length < 2,
      !inputField?.employer || inputField?.employer.length < 2,
      !inputField?.start_date,
      !inputField?.due_date,
      !inputField?.description,
    ];

    errorKeys.forEach((errorKey, i) => {
      if (validations[i]) {
        isSubmited[index] = { ...isSubmited[index], [errorKey]: "Error" };
        newErrors[index] = { ...newErrors[index], [errorKey]: "Invalid" };
      } else {
        newErrors[index] = { ...newErrors[index], [errorKey]: "Correct" };
      }
    });
  });

  return [newErrors, isSubmited];
};


export default validateExp