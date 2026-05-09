import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError';
import { PrismaError } from '../types/customTypes';

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error!', err);
    
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const handleDuplicateErrorDB = (err: PrismaError) => {
  if (err.meta?.target?.includes('email')) {
    return new AppError('Account with this email already exists', 409);
  }

  return new AppError('Resource with these values already exists', 409);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleExpiredTokenError = () =>
  new AppError('Token expired. Please log in again!', 401);

const handlePrismaMalformedIdError = () =>
  new AppError('Malformed ID. Please check the ID format', 400);

const handlePrismaForeignKeyError = () =>
  new AppError('Foreign key constraint failed. Please check the ID', 400);

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error =
    err instanceof AppError ? err : new AppError('Something went wrong!', 500);

  const prismaError = err as PrismaError;

  error.statusCode ||= 500;
  error.status ||= 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    if (prismaError.code === 'P2002') {
      error = handleDuplicateErrorDB(prismaError);
    } else if (prismaError.code === 'P2003') {
      error = handlePrismaForeignKeyError();
    } else if (prismaError.code === 'P2023') {
      error = handlePrismaMalformedIdError();
    } else if (prismaError.name === 'JsonWebTokenError') {
      error = handleJWTError();
    } else if (prismaError.name === 'TokenExpiredError') {
      error = handleExpiredTokenError();
    }

    sendErrorProd(error, res);
  }
};

export default errorHandler;
