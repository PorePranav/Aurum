import { Router } from 'express';

import { getMe, loginUser, signupUser } from '../controllers/auth.controller';
import { protectRoute } from '../utils/authUtils';
import { validateRequest } from '../utils/utilFunctions';
import { loginSchema, signupSchema } from '../validators/auth.validations';

const router = Router();

router.post('/login', validateRequest({ body: loginSchema }), loginUser);
router.post('/signup', validateRequest({ body: signupSchema }), signupUser);

router.get('/me', protectRoute, getMe);

export default router;
