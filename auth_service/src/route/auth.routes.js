import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { loginValidator } from '../../middleware/auth.validators.js';
import { login } from '../controller/auth.controller.js';
import { validateJWT } from '../../utils/validate-jwt.js';

const router = Router();

router.post('/login', [validateJWT, validate(loginValidator)], login);

export default router;