import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { userSchema } from '../../middleware/user.validator.js';
import { post, getAll, getOne, update, remove } from '../controller/user.controller.js';

const router = Router();

router.post('/post', validate(userSchema), post);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);

export default router;