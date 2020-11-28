import * as express from 'express';
import * as passport from 'passport';
import { AuthController } from '../controllers/AuthController';

export const AuthRoutes = express.Router();

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create a user
 *
 */
AuthRoutes.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  AuthController.store
);
/**
 * @swagger
 * /login:
 *  post:
 *    description: Sign in with email and password
 *
 */
AuthRoutes.post(
  '/login',
  passport.authenticate('login', { session: false }),
  AuthController.index
);
