import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { itemSchema } from '../../middleware/item.validator.js';
import { validateJWT } from '../../../auth_service/utils/validate-jwt.js';
import { post, getAll, getOne, update, remove } from '../controller/item.controller.js';

const router = Router();

router.post('/post', [validateJWT, validate(itemSchema)], validate, post);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);

export default router;

