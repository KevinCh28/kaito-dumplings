import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';

export function createApp() {
  const app = express();
  //Enable Parsing Middleware for Requests
  app.use(express.json());

  // Enable CORS
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

  app.use('/api', routes);
  return app;
};