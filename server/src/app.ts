import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(
  '/api/v1/testRoute',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      data: 'You have started the express server successfully',
    });
  },
);

export default app;
