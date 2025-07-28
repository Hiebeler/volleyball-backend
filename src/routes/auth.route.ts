import { type NextFunction, type Request, type Response, Router } from 'express';
import { resSend } from '../helper';
const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  resSend(res, 'halloooo');
});

export default router;
