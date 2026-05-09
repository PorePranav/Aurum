import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { prisma } from '../utils/prisma';

export const getAllExpenses = catchAsync(
  async (req: Request, res: Response) => {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user!.id },
      include: { category: { select: { id: true, name: true } } },
    });

    res.status(200).json({
      status: 'success',
      length: expenses.length,
      data: expenses,
    });
  },
);

export const createExpense = catchAsync(async (req: Request, res: Response) => {
  const newExpense = await prisma.expense.create({
    data: { ...req.body, userId: req.user!.id },
  });

  res.status(200).json({
    status: 'success',
    data: newExpense,
  });
});
