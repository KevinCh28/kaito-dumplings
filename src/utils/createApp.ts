import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import usersRouter from "../routes/users/users";
import productsRouter from "../routes/products/products";
import ordersRouter from "../routes/orders/orders";
import cartsRouter from "../routes/carts/carts";
import "dotenv/config";

const mongoURI = process.env.mongoURI;

function createApp(): Express {
  const app = express();
  //Enable Parsing Middleware for Requests
  app.use(express.json());
  app.use(cookieParser());

  // Enable CORS
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
  // Enable Sessions
  app.use(
    session({
      secret: 'NJKFSDJKDFNJKSJKKSRIEWVNOA',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 * 30, },
      store: store.create({ mongoUrl: mongoURI })
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Enable app to respond to apps like postman
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api/users', usersRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/carts', cartsRouter);

  return app;
};

export default createApp;