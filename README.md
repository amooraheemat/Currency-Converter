💱 Currency Converter API
A Node.js-based RESTful API that allows users to convert between supported currencies using real-time exchange rates. The API also supports logging of all conversions, storing them in a MySQL database, and optionally sending results via email.

🚀 Features
🔄 Real-time currency conversion using a public exchange rate API

📬 Optional email notifications with conversion details

📁 Logs all conversions to a file using Winston

🛡️ Input validation with express-validator

🗂️ Robust error handling middleware

🧾 Pagination support for viewing all conversion history

✅ Sequelize ORM integration with MySQL database

🛠️ Tech Stack
Node.js & Express.js

MySQL & Sequelize

Axios for HTTP requests

Nodemailer for email services

Winston for logging

dotenv for environment configuration

express-validator for request validation

📂 Project Structure
pgsql
Copy
Edit
Currency-Converter/
│
├── src/
│   ├── Controllers/
│   │   └── conversionController.js
│   ├── Models/
│   │   └── conversionModel.js
│   ├── Routes/
│   │   └── conversionRoutes.js
│   ├── Services/
│   │   └── emailService.js
│   ├── Utils/
│   │   └── logger.js
│   └── Middlewares/
│       └── validation.js
│
├── Config/
│   └── database.js
│
├── .gitignore
├── app.js
├── package.json
└── README.md
🧪 Getting Started
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/currency-converter-api.git
cd currency-converter-api
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Configure environment variables
Create a .env file and fill in:

env
Copy
Edit
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=currency_converter_db
DB_PORT=3306
DB_DIALECT=mysql

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM="Currency API <noreply@currencyapi.com>"
NODE_ENV=development
4️⃣ Start the server
bash
Copy
Edit
npm run dev
📮 API Endpoints
🔁 Convert Currency
bash
Copy
Edit
POST /api/v1/convert
Request Body

json
Copy
Edit
{
  "fromCurrency": "USD",
  "toCurrency": "NGN",
  "amount": 100,
  "email": "user@example.com"  // optional
}
Response

json
Copy
Edit
{
  "status": true,
  "message": "Currency converted successfully",
  "data": {
    "id": 1,
    "fromCurrency": "USD",
    "toCurrency": "NGN",
    "amount": 100,
    "convertedAmount": 145000.00,
    "rateUsed": 1450.00,
    "email": "user@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
📃 Get All Conversions
bash
Copy
Edit
GET /api/v1/conversions?page=1&limit=10
Returns paginated list of all conversions stored in the database.

✅ Validations
fromCurrency & toCurrency: Required, must be 3-letter currency codes (e.g., USD)

amount: Required, must be a positive number

email: Optional, must be valid if provided

📦 Logging
All conversions are logged in logs/conversions.log using Winston with timestamps.

🔐 Security & Best Practices
Environment variables are stored securely with dotenv

Input validation and sanitation using express-validator

All sensitive keys are excluded from public files using .gitignore

🧪 Testing (with Postman)
Open Postman and create a new request.

Set request type to POST and use URL: http://localhost:3000/api/v1/convert

In Body → raw → JSON, paste:

json
Copy
Edit
{
  "fromCurrency": "USD",
  "toCurrency": "NGN",
  "amount": 100,
  "email": "you@example.com"
}
Hit Send and view the result.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

📄 License
MIT License © 2025 Amoo Raheemat Omotayo