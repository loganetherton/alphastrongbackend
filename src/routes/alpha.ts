import * as express from 'express';

import * as alphaController from "../controllers/alpha";

const router = express.Router();

router.get('/', alphaController.getAlpha);

export default router;
