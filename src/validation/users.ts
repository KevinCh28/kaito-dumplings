import Validator from "validator";
import validText from "./valid-text";

export default function validateUserUpdate(data: { password: string; password2: string; }) {
  let errors = {
    password: '',
    password2: ''
  };

  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Passwords does not match';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords does not match';
  }

  return {
    errors,
    isValid: errors.password.length === 0 && errors.password2.length === 0
  };
};