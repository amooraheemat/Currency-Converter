import express from 'express';
import { connectMySQL } from './src/config/database.js';
import conversionRoutes from './src/Routes/conversionRoutes.js';
import { errorHandler } from './src/Middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());

app.use(errorHandler);

app.use('/api', conversionRoutes );

await connectMySQL().then(() =>{
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}); 


