import { check } from 'express-validator';
import handleValidationErrors from "./handleValidationErrors";

const validateOrderInput = [
  check('products')
    .exists({ checkFalsy: true })
    .withMessage('Order must contain at least one product'),
  check('orderStatus')
    .exists({ checkFalsy: true })
    .withMessage('Order status is required')
    .isIn(['pending', 'transit', 'completed', 'refunded', 'canceled'])
    .withMessage('Order status must be either pending, transit, completed, refunded, or canceled'),
  handleValidationErrors,
];

export default validateOrderInput;