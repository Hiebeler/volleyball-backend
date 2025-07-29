import { container } from 'tsyringe';
import { type NextFunction, type Request, type Response, Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const router = Router();
const authController = container.resolve(AuthController);

router.post('/login', (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next),
);
export default router;
