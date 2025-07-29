import { container } from 'tsyringe';
import { type NextFunction, type Request, type Response, Router } from 'express';
import { TableController } from '../controllers/table.controller';
const router = Router();
const tableController = container.resolve(TableController);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  tableController.getAll(req, res, next),
);
export default router;
