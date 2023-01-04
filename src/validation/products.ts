import { check } from 'express-validator';
import handleValidationErrors from "./handleValidationErrors";

const validateProductInput = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Product name is required')
    .isLength({ min: 1, max: 30 })
    .withMessage('Product name must be between 4 to 30 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Product name contains invalid values'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Product description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .matches(/[0-9]/)
    .withMessage('Product price contains non numeric values'),
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Product image url is required'),
  check('category')
    .exists({ checkFalsy: true })
    .withMessage('Product category is required'),
  handleValidationErrors
];

export default validateProductInput;