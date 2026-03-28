import { Request, Response, NextFunction } from 'express';

import prisma from '../utils/prisma';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

export const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await prisma.expenseCategory.findMany();

    res.status(200).json({
      status: 'success',
      data: categories,
    });
  },
);

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = await prisma.expenseCategory.create({ data: req.body });

    res.status(200).json({
      status: 'success',
      data: newCategory,
    });
  },
);
