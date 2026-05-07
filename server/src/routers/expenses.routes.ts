import { Router } from 'express';
import {
  createExpense,
  getAllExpenses,
} from '../controllers/expenses.controller';
import { protectRoute } from '../utils/authUtils';
import { validateRequest } from '../utils/utilFunctions';
import { createExpenseSchema } from '../validators/expense.validations';

const router = Router();

router.use(protectRoute);
router.get('/', getAllExpenses);
router.post('/', validateRequest({ body: createExpenseSchema }), createExpense);

export default router;
