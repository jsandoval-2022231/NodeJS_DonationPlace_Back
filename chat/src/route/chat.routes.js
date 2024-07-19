import { Router } from "express";
import { handleChatConnection, postChatMessage} from "../controller/chat.controller.js";
import { validateJWT } from '../../../auth_service/utils/validate-jwt.js';

const router = Router();

router.post('/message', [validateJWT], postChatMessage);

export default router;