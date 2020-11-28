import { Sequelize } from 'sequelize';
const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/db.sqlite3`,
  logging: false,
});

export default dbConnection;
