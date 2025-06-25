import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendConversionEmail = async (recipient, details) => {
  const { fromCurrency, toCurrency, amount, convertedAmount, rateUsed } = details;

   const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: 'Currency Conversion Result',
    text: `
Hello,

Your currency has been processed successfully.

From: ${amount} ${fromCurrency}
To: ${convertedAmount} ${toCurrency}
Exchange Rate Used: ${rateUsed}

Thank you for using our Currency Converter!

Regards,
Currency Converter Team
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}`);
  } 
  catch (error) {
    console.error('Unale to send Email:', error.message);
  }
};

