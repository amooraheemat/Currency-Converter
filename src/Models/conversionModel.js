import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Conversion = sequelize.define('Conversion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fromCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,  // NGN, instead of ngn or Ngn
      len: [3, 3]   
    },
  },
  toCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      len: [3, 3]
    },
  },
  amount: {
    type: DataTypes.DECIMAL(18, 5),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  },
  convertedAmount: {
    type: DataTypes.DECIMAL(18, 5),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  rateUsed: {
    type: DataTypes.DECIMAL(18, 5),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  }
}, {
  timestamps: true,
  tableName: 'Conversions'
});

export default Conversion;