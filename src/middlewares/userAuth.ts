import type { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

const config = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      throw Error('invalid jwt');
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = auth;
