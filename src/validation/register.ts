import { check } from 'express-validator';
import handleValidationErrors from "./handleValidationErrors";

const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address.'),
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
  check('firstname')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('First name can not be blank'),
  check('lastname')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Last name can not be blank'),
  handleValidationErrors,
];

export default validateRegisterInput;