import { check } from 'express-validator';
import handleValidationErrors from "./handleValidationErrors";

const validateUserUpdate = [
  check('password')
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 to 16 characters.'),
  check('password2')
    .trim()
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
  handleValidationErrors
];

export default validateUserUpdate;