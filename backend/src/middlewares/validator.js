const { body, validationResult } = require("express-validator");

exports.validateStudent = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First name must not exceed 100 characters")
    .trim()
    .escape(),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name must not exceed 100 characters")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .isLength({ max: 100 })
    .normalizeEmail(),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ max: 20 })
    .isString()
    .trim()
    .escape(),
  body("enrollmentDate")
    .notEmpty()
    .withMessage("Enrollment date is required")
    .isISO8601()
    .withMessage("Enrollment date must be a valid date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
