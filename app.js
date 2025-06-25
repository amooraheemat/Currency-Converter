import express from 'express';
import { connectMySQL } from './src/config/database.js';
import converterRoutes from './src/Routes/conversionRoutes.js';
import { errorHandler } from './src/Middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(errorHandler);

app.use('/api', converterRoutes );

await connectMySQL().then(() =>{
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}); 


