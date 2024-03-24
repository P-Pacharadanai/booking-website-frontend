const validateForm = (data) => {
  const errors = {};

  if (data.email.trim() === "") {
    errors.email = "Please enter your email.";
  }

  if (data.password.trim() === "") {
    errors.password = "Please enter your password.";
  }

  return errors;
};

export default validateForm;
