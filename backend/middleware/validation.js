import { body, validationResult } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.error('❌ Validation errors:', errors.array())
    console.error('📦 Request body:', req.body)
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    })
  }
  next()
}

export const validateBooking = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid Indian phone number'),
  body('service')
    .isIn(['Bridal Mehndi', 'Arabic Mehndi', 'Indo-Western', 'Party Mehndi'])
    .withMessage('Please select a valid service'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value < new Date()) {
        throw new Error('Date cannot be in the past')
      }
      return true
    }),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format'),
  handleValidationErrors
]

export const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('service')
    .optional()
    .customSanitizer(value => {
      if (!value) return 'bridal'
      const serviceMap = {
        'Bridal Mehndi': 'bridal',
        'Arabic Mehndi': 'arabic',
        'Indo-Western': 'party',
        'Party Mehndi': 'party'
      }
      return serviceMap[value] || 'bridal'
    }),
  body('message')
    .optional()
    .trim(),
  handleValidationErrors
]

export const validateService = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('minPrice')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  body('maxPrice')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number')
    .custom((value, { req }) => {
      if (value < req.body.minPrice) {
        throw new Error('Maximum price must be greater than minimum price')
      }
      return true
    }),
  body('duration')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Duration must be between 3 and 50 characters'),
  body('category')
    .isIn(['Bridal', 'Arabic', 'Indo-Western', 'Party'])
    .withMessage('Please select a valid category'),
  handleValidationErrors
]

export const validateGallery = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('category')
    .isIn(['Bridal', 'Arabic', 'Indo-Western', 'Party'])
    .withMessage('Please select a valid category'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description must not exceed 200 characters'),
  handleValidationErrors
]