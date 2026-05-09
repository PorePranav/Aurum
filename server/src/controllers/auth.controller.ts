import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError';
import { createSendToken } from '../utils/authUtils';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../utils/prisma';

export const signupUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return next(new AppError('Passwords do not match', 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _password, ...sanitizedUser } = newUser;

    createSendToken(sanitizedUser, 201, res);
  },
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    const doesPasswordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !doesPasswordMatch)
      return next(new AppError('Invalid credentials', 401));

    const { password: _password, ...sanitizedUser } = user;

    createSendToken(sanitizedUser, 200, res);
  },
);

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const fetchedUser = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: fetchedUser,
  });
});

export const forgotUserPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email: _email } = req.body;

    /* TODO: Complete forgot password implementation */

    res.status(200).json({
      status: 'success',
    });
  },
);

export const resetUserPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.token)
      return next(new AppError('Token is required to reset password', 401));

    /* TODO: Complete reset password implementation */

    res.status(200).json({
      status: 'success',
    });
  },
);

export const updateUserPassword = catchAsync(
  async (req: Request, res: Response) => {
    const {
      currentPassword: _currentPassword,
      newPassword: _newPassword,
      confirmNewPassword: _confirmNewPassword,
    } = req.body;

    /* TODO: Complete update password implementation */

    res.status(200).json({
      status: 'success',
    });
  },
);

export const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie('jwt').status(204).json({
    status: 'success',
  });
});
