import { config } from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import users from "../routes/auth/index";
import products from "../routes/products/index";
import carts from "../routes/carts/index";
import store from "connect-mongo";
import bodyParser from "body-parser";
const db = require("../../config/keys").mongoURI;

config();

function createApp(): Express {
  const app = express();
  //Enable Parsing Middleware for Requests
  app.use(express.json());

  // Enable CORS
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
  // Enable Sessions
  app.use(
    session({
      secret: 'NJKFSDJKDFNJKSJKKSRIEWVNOA',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 * 30, },
      store: store.create({ mongoUrl: db })
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Enable app to respond to apps like postman
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api/users', users);
  app.use('/api/products', products);
  app.use('/api/cart', carts);
  return app;
};

export default createApp;