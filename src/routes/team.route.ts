import { container } from 'tsyringe';
import { type NextFunction, type Request, type Response, Router } from 'express';
import { TeamController } from '../controllers/team.controller';

const router = Router();
const teamController = container.resolve(TeamController);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  teamController.getAll(req, res, next),
);
export default router;
