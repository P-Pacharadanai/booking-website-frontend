const validateForm = (data) => {
  const errors = {};

  const name_pattern = /^([\u0E00-\u0E7FA-Za-z]+)\s([\u0E00-\u0E7FA-Za-z]+)(\d*)$/;
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_pattern = /^[0-9]{10}$/;
  const password_pattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/;

  if (data.username.trim() === "") {
    errors.username = "Please enter your name.";
  } else if (!name_pattern.test(data.username)) {
    errors.username = "Invalid name format.";
  }

  if (data.email.trim() === "") {
    errors.email = "Please enter your email.";
  } else if (!email_pattern.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  if (data.phone.trim() === "") {
    errors.phone = "Please enter your phone number.";
  } else if (!phone_pattern.test(data.phone)) {
    errors.phone = "Invalid phone number format.";
  }

  if (data.password.trim() === "") {
    errors.password = "Please enter your password.";
  } else if (!password_pattern.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters long and include 1 special character, 1 uppercase letter, and 1 lowercase letter.";
  }

  if (data.confirmPassword.trim() === "") {
    errors.confirmPassword = "Please confirm your password.";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export default validateForm;
