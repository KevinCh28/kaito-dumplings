import Validator from "validator";
import validText from "./valid-text.js";

export default function validateLoginInput(data) {
  let errors = {
    email: "",
    password: ""
  };

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: errors.email.length === 0 && errors.password.length === 0
  };
};