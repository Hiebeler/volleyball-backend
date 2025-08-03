import { container } from 'tsyringe';
import { type NextFunction, type Request, type Response, Router } from 'express';
import { GameController } from '../controllers/game.controller';
const auth = require('../middlewares/userAuth');
const router = Router();
const gameController = container.resolve(GameController);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  gameController.getAll(req, res, next),
);

router.get('/upcoming', (req: Request, res: Response, next: NextFunction) =>
  gameController.getUpcoming(req, res, next),
);

router.get('/ongoing', (req: Request, res: Response, next: NextFunction) =>
  gameController.getOngoing(req, res, next),
);

router.get('/finished', (req: Request, res: Response, next: NextFunction) =>
  gameController.getFinished(req, res, next),
);

router.put('/:gameId/status', auth, (req: Request, res: Response, next: NextFunction) =>
  gameController.setStatus(req, res, next),
);

export default router;
