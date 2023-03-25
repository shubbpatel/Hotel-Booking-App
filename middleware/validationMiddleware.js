const { check, validationResult } = require('express-validator');

exports.validateBooking = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Invalid email address'),
  check('phone')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  check('address')
    .not()
    .isEmpty()
    .withMessage('Address is required'),
  check('room')
    .not()
    .isEmpty()
    .withMessage('Please select a room'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
