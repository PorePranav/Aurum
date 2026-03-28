import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import prisma from '../utils/prisma';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import { createSendToken } from '../utils/authUtils';

export const signupUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return next(new AppError('Passwords do not match', 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const { password: newUserPassword, ...data } = newUser;

    createSendToken(newUser, 201, res);
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

    createSendToken(user, 200, res);
  },
);

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

export const forgotUserPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    /*TODO: Complete the implementation for forgot password*/

    res.status(200).json({
      status: 'success',
    });
  },
);

export const resetUserPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.token)
      return next(new AppError('Token is required to reset password', 401));

    /*TODO: Complete the implementation for reset password*/

    res.status(200).json({
      status: 'success',
    });
  },
);

export const updateUserPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    /*TODO: Complete implementation for update password */
    res.status(200).json({
      status: 'success',
    });
  },
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('jwt').status(204).json({
      status: 'success',
    });
  },
);
