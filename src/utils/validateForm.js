const validateForm = (values) => {
  for (const value of values) {
    if (!value) {
      return true;
    }
  }

  return false;
};

export default validateForm;

export const checkValues = (savedValue, preValues) => {
  if (savedValue || savedValue?.length > 0) {
    return savedValue;
  }

  return preValues;
};
