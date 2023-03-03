import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const db = require("../../config/keys").mongoURI;

import { config } from "dotenv";
config();

import usersRouter from "../routes/users/users";
import productsRouter from "../routes/products/products";
import ordersRouter from "../routes/orders/orders";
import cartsRouter from "../routes/carts/carts";

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
      store: store.create({ mongoUrl: db })
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
  app.use('/api/cart', cartsRouter);

  // if (process.env.NODE_ENV === 'production') {
  //   const path = require("path");
  //   // Serve the frontend's index.html file at the root route
  //   app.get("/", (req, res) => {
  //     res.cookie("CSRF-TOKEN", req.csrfToken());
  //     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  //   });

  //   // Serve the static assets in the frontend's build folder
  //   app.use(express.static(path.resolve("../client", "build")));

  //   // Serve the frontend's index.html file at all other routes NOT starting with /api
  //   app.get(/^(?!\/?api).*/, (req, res) => {
  //     res.cookie("CSRF-TOKEN", req.csrfToken());
  //     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  //   });
  // }

  return app;
};

export default createApp;