import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { loginValidator } from '../../middleware/auth.validators.js';
import { login } from '../controller/auth.controller.js';

const router = Router();

router.post('/login', validate(loginValidator), login);

export default router;