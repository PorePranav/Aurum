import { Request, Response, NextFunction, CookieOptions } from 'express';
import jwt from 'jsonwebtoken';

import AppError from './AppError';
import catchAsync from './catchAsync';
import { CustomJwtPayload, SafeUser } from '../types/customTypes';

const signToken = (user: SafeUser) => {
  const { id } = user;

  const payload: CustomJwtPayload = { id };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: (Number(process.env.JWT_EXPIRES_IN) || 90) * 24 * 60 * 60,
  });
};

export const createSendToken = (
  user: SafeUser,
  statusCode: number,
  res: Response,
) => {
  const token = signToken(user);
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  };

  const {
    passwordResetToken: _passwordResetToken,
    passwordChangedAt: _passwordChangedAt,
    passwordResetTokenExpiresAt: _passwordResetTokenExpiresAt,
    ...userData
  } = user;

  res.cookie('jwt', token, cookieOptions).status(statusCode).json({
    status: 'success',
    data: userData,
  });
};

export const protectRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;

    if (!token || token === null)
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          401,
        ),
      );

    const decodedUser = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    )) as CustomJwtPayload;

    req.user = decodedUser as CustomJwtPayload;

    next();
  },
);
