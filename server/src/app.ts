import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controllers/error.controller';
import AppError from './utils/AppError';

import authRouter from './routers/auth.routes';
import expenseRouter from './routers/expenses.routes';
import categoryRouter from './routers/categories.routes';

const app = express();

app.use(cookieParser());
app.use(cors());
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
