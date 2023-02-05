import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes/index.js';

export function createApp() {
  const app = express();
  //Enable Parsing Middleware for Requests
  app.use(express.json());

  // Enable CORS
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
  app.use(
    session({
      secret: 'NJKFSDJKDFNJKSJKKSRIEWVNOA',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 * 30, },
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', routes);
  return app;
};