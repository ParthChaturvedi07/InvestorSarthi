// validators/projectValidator.js
import { body, validationResult } from "express-validator";

export const validateProject = [
  body("title").notEmpty().withMessage("Title is required"),
  body("type")
    .isIn(["Commercial", "Residential", "Plot"])
    .withMessage("Type must be Commercial, Residential, or Plot"),
  body("description").notEmpty().withMessage("Description is required"),
  body("location").notEmpty().withMessage("Location is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// ✅ Update validator (fields optional)
export const validateProjectUpdate = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("type")
    .optional()
    .isIn(["Commercial", "Residential", "Plot"])
    .withMessage("Type must be Commercial, Residential, or Plot"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
