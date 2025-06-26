import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }, 
  tls: {
    rejectUnauthorized: false
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
    console.error('Unable to send Email:', error);
  }
};

