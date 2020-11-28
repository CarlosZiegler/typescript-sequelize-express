import sequelize from '../database/configs/db.config';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default User;
