const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandle = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// * GLOBAL MIDDLEWARE
// todo: Set security HTTP headers
app.use(helmet());

// todo: Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// todo: Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// todo: Body parser, reading data from body into req.body
app.use(express.json({ limit: '10Kb' }));

// todo: Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// todo: Data sanitization against XSS
app.use(xss());

// todo: Serving static file
app.use(express.static(`${__dirname}/public`));

// todo: Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// * ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle);

module.exports = app;
