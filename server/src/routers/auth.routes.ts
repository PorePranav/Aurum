import { Router } from 'express';

import { loginUser, signupUser } from '../controllers/auth.controller';
import { validateRequest } from '../utils/utilFunctions';
import { loginSchema, signupSchema } from '../validators/auth.validations';

const router = Router();

router.post('/login', validateRequest({ body: loginSchema }), loginUser);
router.post('/signup', validateRequest({ body: signupSchema }), signupUser);

export default router;
