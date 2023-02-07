import Validator from "validator";
import validText from "./valid-text.js";

export default function validateProductInput(data) {
  let errors = {
    name: "",
    description: ""
  };

  data.name = validText(data.name) ? data.name : '';
  data.description = validText(data.description) ? data.description : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Product name is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Product description is required';
  }

  return {
    errors,
    isValid: errors.name.length === 0 && errors.description.length === 0
  };
};