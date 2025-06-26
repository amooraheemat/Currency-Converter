import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

//MySQl Connection
const DB_NAME=process.env.DB_NAME;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_HOST=process.env.DB_HOST || 'localhost';
const DB_DIALECT=process.env.DB_DIALECT || 'mysql';
const DB_PORT=process.env.DB_PORT || 3306;

const sequelize = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: false,
});

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
  console.log('Database connected successfully');
  await sequelize.sync();
  }
  catch (error) {
    console.error('Unable to connect to Database:', error.message);
  }
};

export default sequelize;