import Validator from "validator";
import validText from "./valid-text";

export default function validateRegisterInput(data: { firstname: string; lastname: string; email: string; password: string; password2: string; }) {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: ""
  };

  console.log(data)
  data.firstname = validText(data.firstname) ? data.firstname : '';
  data.lastname = validText(data.lastname) ? data.lastname : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  console.log(data)
  console.log(errors)

  if (!Validator.isLength(data.firstname, { min: 1, max: 30 })) {
    errors.firstname = 'First name can not be blank';
  }

  if (!Validator.isLength(data.lastname, { min: 1, max: 30 })) {
    errors.lastname = 'Last name can not be blank';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Passwords does not match';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords does not match';
  }

  return {
    errors,
    isValid:
      errors.firstname.length === 0 &&
      errors.lastname.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.password2.length === 0
  };
};