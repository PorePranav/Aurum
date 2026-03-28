import { ZodTypeAny, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

import catchAsync from './catchAsync';
import AppError from './AppError';

type Schema = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export const validateRequest = (schema: Schema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query) as typeof req.query;
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as typeof req.params;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map((issue) => issue.message);

        return next(new AppError(formattedErrors.join(', '), 400));
      }

      return next(err);
    }
  });
};
