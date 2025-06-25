import axios from "axios";
import { Conversion } from '../Models/conversionModel.js';
import { sendConversionEmail } from '../Services/emailService.js';
import { logger } from '../Utils/logger.js';

const supportedCurrencies = ['USD', 'EUR', 'GBP', 'NGN', 'CAD', 'JPY', 'AUD', 'CNY', 'ZAR'];

//Converting from one currency to another
export const convertCurrency = async (req, res) => {
    try {
        const { fromCurrency, toCurrency, amount, email } = req.body;

        // Validates input fields
        if (!fromCurrency || !toCurrency || !amount) {
            return res.status(400).json({ 
                status: false,
                message: 'fromCurrency, toCurrency, and amount are required', 
                data: null
            });
        }

        // Ensures Amount is a positive and isn't empty
         if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({
            status: false,
            message: 'Amount must be a positive number',
            data: null
            });
        } 

        const from = fromCurrency.toUpperCase();
        const to = toCurrency.toUpperCase();

    // Validate Currency supplied
    if (!supportedCurrencies.includes(from) || !supportedCurrencies.includes(to)) {
        return res.status(400).json({
            status: false,
            message: 'Unsupported currency code provided',
            data: null
        });
    }

        //Get Converson Rates from External API
            const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
        const { data } = await axios.get(url);
        
        const rate = data.rates[toCurrency.toUpperCase()];
        if (!rate) {
      return res.status(400).json({ 
        status: false,
        message: 'Excahnge rate not found',
        data: null
    });
      }
        const convertedAmount = (Number(amount) * rate).toFixed(5);

        const conversion = await Conversion.create({
            fromCurrency: from,
            toCurrency: to,
            amount,
            convertedAmount,
            rateUsed: rate,
            email
        });

        // Sends output to User's Email
        if (email) {
            await sendConversionEmail(email, {
                fromCurrency: from,
                toCurrency: to,
                amount,
                convertedAmount,
                rateUsed: rate
            });
        }

         // Conversion Logging
        logger.info({
            fromCurrency: from,
            toCurrency: to,
            amount,
            convertedAmount,
            rateUsed: rate,
            email,
            timestamp: new Date().toISOString()
        });

        res.status(201).json({
            status: true,
            message: 'Currency converted successfully',
            data: conversion
        });
    }    
    catch (error) {
        console.error(error. message);
       
        logger. error({
             message: 'Conversion failed',
            error: error.message,
            timestamp: new Date().toISOString()
        })
        res.status(500).json({
            message: 'Error converting currency, please try again later',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const getAllConversions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Conversion.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            status: true,
            message: 'All conversions retrieved',
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalConversions: count,
            data: rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            status: false,
            message: 'Unable to get all conversions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
