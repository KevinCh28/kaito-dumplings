import { check } from 'express-validator';
import handleValidationErrors from "./handleValidationErrors";

const validateOrderInput = [
  check('products')
    .exists({ checkFalsy: true })
    .withMessage('Order must contain at least one product'),
  handleValidationErrors,
];

export default validateOrderInput;