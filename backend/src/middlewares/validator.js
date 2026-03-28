const { body, validationResult } = require("express-validator");

exports.validateStudent = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .escape(),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("phone").optional().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
