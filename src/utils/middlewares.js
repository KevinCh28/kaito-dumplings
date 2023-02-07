const express = require("express");
const req = express.Request;
const res = express.Response;
const next = express.NextFunction;

export const isAuthenticated = (req, res, next) => (
  req.user ? next() : res.status(403).send({ msg: 'Unauthorized' })
);