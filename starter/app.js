const express = require('express');
const fs = require('fs');

const tourRouter = require('../starter/routes/tourRoutes');
const userRouter = require('../starter/routes/userRoutes');
const app = express();
// MIDDLEWARE
// app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware!!!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
