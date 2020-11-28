require('dotenv').config();
import * as express from 'express';
import * as Cors from 'cors';
const app = express();
import { AuthRoutes } from './routes/AuthRoutes';
import dbConnection from './database/configs/db.config';

require('./auth/auth');

try {
  dbConnection.authenticate();
  console.log('Connection Database established.');
} catch (error) {
  console.log('Unable to connect to db: ', error);
}

app.use(Cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', AuthRoutes);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});

export default app;
