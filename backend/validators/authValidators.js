const {check, validationResult} = require('express-validator');
const validator = require('validator');

const registerValidationRules = () => {
  return [
    check('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({min: 3})
      .withMessage('Username must be at least 3 characters long'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Invalid email address'),
    check('password')
      .trim()
      .isLength({min: 6})
      .withMessage('Password must be at least 6 characters long')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  validate,
};
