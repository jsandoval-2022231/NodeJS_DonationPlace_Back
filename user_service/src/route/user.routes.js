import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { userSchema } from '../../utils/user.validator.js';
import { post, getAll, getOne, update, remove, getByToken } from '../controller/user.controller.js';
import { validateJWT } from '../../../auth_service/utils/validate-jwt.js';

const router = Router();

router.post('/post', validate(userSchema), post);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);
router.get('/my', [validateJWT], getByToken);

export default router;