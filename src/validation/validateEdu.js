export const validateEdu = (experienceData) => {
  const newErrors = {};
  const isSubmited = {};
  experienceData?.forEach((inputField, index) => {
    const errorKeys = ["institute", "degree", "end_date", "description"];
    const validations = [
      !inputField?.institute || inputField?.institute.length < 2,
      !inputField?.degree,
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
