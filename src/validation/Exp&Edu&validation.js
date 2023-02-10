const validateData = (experienceData, type) => {
  const newErrors = {};
  const isSubmited = {};
  const errorKeys =
    type === "edu"
      ? ["institute", "degree_id", "end_date", "description"]
      : ["position", "employer", "start_date", "end_date", "desc"];

  experienceData?.forEach((inputField, index) => {
    const validations =
      type === "edu"
        ? [
            !inputField?.institute || inputField?.institute.length < 2,
            !inputField?.degree_id,
            !inputField?.due_date,
            !inputField?.description,
          ]
        : [
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

export default validateData;
