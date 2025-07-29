import { container } from 'tsyringe';
import { type NextFunction, type Request, type Response, Router } from 'express';
import { GameController } from '../controllers/game.controller';
const router = Router();
const gameController = container.resolve(GameController);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  gameController.getAll(req, res, next),
);

export default router;
