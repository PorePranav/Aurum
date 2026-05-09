import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import globalErrorHandler from './controllers/error.controller';
import authRouter from './routers/auth.routes';
import categoryRouter from './routers/categories.routes';
import expenseRouter from './routers/expenses.routes';
import AppError from './utils/AppError';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/expenses', expenseRouter);
app.use('/api/v1/categories', categoryRouter);

app.all('/{*splat}', (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on this server`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
