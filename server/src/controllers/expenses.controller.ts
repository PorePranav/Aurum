import { Request, Response, NextFunction } from 'express';

import prisma from '../utils/prisma';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

export const getAllExpenses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user!.id },
    });

    res.status(200).json({
      status: 'success',
      data: expenses,
    });
  },
);

export const createExpense = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newExpense = await prisma.expense.create({
      data: { ...req.body, userId: req.user!.id },
    });

    res.status(200).json({
      status: 'success',
      data: newExpense,
    });
  },
);
