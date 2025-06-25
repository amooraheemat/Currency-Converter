import { body } from 'express-validator';

export const validateConversionRequest = [
  body('fromCurrency')
    .notEmpty().withMessage('fromCurrency is required')
    .isAlpha().withMessage('fromCurrency must contain only letters')
    .isLength({ min: 3, max: 3 }).withMessage('fromCurrency must be a 3-letter code'),

  body('toCurrency')
    .notEmpty().withMessage('toCurrency is required')
    .isAlpha().withMessage('toCurrency must contain only letters')
    .isLength({ min: 3, max: 3 }).withMessage('toCurrency must be a 3-letter code'),

  body('amount')
    .notEmpty().withMessage('amount is required')
    .isFloat({ gt: 0 }).withMessage('amount must be a positive number'),

  body('email')
    .optional()
    .isEmail().withMessage('email must be valid'),
];
