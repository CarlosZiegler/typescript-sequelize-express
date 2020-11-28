import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { secret as jwtSecret } from '../../jwtConfig';
import { NextFunction, Request, Response } from 'express';

export const AuthController = {
  // Create new User account
  async store(req: Request, res: Response, next: NextFunction) {
    return res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },

  // Login user with email and password
  async index(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An Error occurred');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };

          const token = jwt.sign({ user: body }, jwtSecret);

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
};
