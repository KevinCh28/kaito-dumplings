import Validator from "validator";
import validText from "./valid-text.js";

module.exports = function validateProductInput(data) {
  let errors = {};

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
    isValid: Object.keys(errors).length === 0
  };
};