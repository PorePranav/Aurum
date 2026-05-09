import { Router } from 'express';

import {
  createCategory,
  getAllCategories,
} from '../controllers/categories.controller';
import { protectRoute } from '../utils/authUtils';
import { validateRequest } from '../utils/utilFunctions';
import { createCategorySchema } from '../validators/category.validations';

const router = Router();

router.use(protectRoute);
router.get('/', getAllCategories);
router.post(
  '/',
  validateRequest({ body: createCategorySchema }),
  createCategory,
);

export default router;
