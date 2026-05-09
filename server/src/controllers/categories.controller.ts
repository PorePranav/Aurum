import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { prisma } from '../utils/prisma';

export const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const categories = await prisma.expenseCategory.findMany();

    res.status(200).json({
      status: 'success',
      data: categories,
    });
  },
);

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const newCategory = await prisma.expenseCategory.create({ data: req.body });

    res.status(200).json({
      status: 'success',
      data: newCategory,
    });
  },
);
