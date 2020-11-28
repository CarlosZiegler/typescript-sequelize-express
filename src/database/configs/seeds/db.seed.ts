import db from '../db.config';
import UserModel from '../../../models/User';
import { User } from '../../../models/User.entity';
const bcrypt = require('bcrypt');

const seed = async () => {
  await db.sync({ force: true });

  const password = `1212`;
  const email = 'carlos@gmail.com';
  const hash = await bcrypt.hash(password, 10);
  UserModel.create({
    password: hash,
    email: email,
  })
    .then((user: any) => {
      console.log('seeded user', user);

      UserModel.findOne({ where: { email: `${user.email}` } })
        .then((user) => {
          console.log('found in db after adding');
          db.close();
        })
        .catch((error) => {
          console.error('error looking for new user in db: ', error);
          db.close();
        });
    })
    .catch((error) => {
      console.error('failed to seed, ', error);
      db.close();
    });
};

seed();
