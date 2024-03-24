const validateForm = (data) => {
  const errors = {};

  const name_pattern = /^([\u0E00-\u0E7FA-Za-z]+)\s([\u0E00-\u0E7FA-Za-z]+)$/;
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_pattern = /^[0-9]{10}$/;

  if (!name_pattern.test(data.username)) {
    errors.username = "Invalid name format.";
  }

  if (!email_pattern.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  if (!phone_pattern.test(data.phone)) {
    errors.phone = "Invalid phone number format.";
  }

  return errors;
};

export default validateForm;
