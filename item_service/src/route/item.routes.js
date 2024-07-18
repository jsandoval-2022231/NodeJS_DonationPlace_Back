import { Router } from 'express';
import { validate } from '../../../http_service/test/validate-field.js';
import { itemSchema } from '../../utils/item.validator.js';
import { validateJWT } from '../../../auth_service/utils/validate-jwt.js';
import { post, getAll, getOne, update, remove, insertProduct, addComment } from '../controller/item.controller.js';

const router = Router();


router.post('/post', [validateJWT, validate(itemSchema)], post);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);
router.post('/postProduct', [validateJWT, ], insertProduct);
router.put('/comment/:id', [validateJWT,], addComment);

export default router;

