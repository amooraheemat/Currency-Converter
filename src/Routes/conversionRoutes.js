import express from 'express';
import { convertCurrency, getAllConversions } from '../Controllers/conversionController.js';
import { validateConversionRequest } from '../Validations/conversionValidation.js';
import { validate } from '../Middleware/validate.js';


const router = express.Router();


router.post('/convert', validateConversionRequest, validate, convertCurrency);
router.get('/conversions', getAllConversions);

export default router;
