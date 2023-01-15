import { sequelize } from '../core/db.js'
import { DataTypes } from 'sequelize'
export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  user_id: { type: DataTypes.STRING, unique: true },
  phone_number: { type: DataTypes.STRING },
  user_lang: { type: DataTypes.STRING },
  last_state: { type: DataTypes.STRING },
  locationn: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
})
