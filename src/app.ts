import express, { Request, Response } from 'express';
import authRoute from './routes/auth.route';
import { errorHandler } from './middlewares/errorHandler';
const app = express();

app.use(express.json());

app.use('/api/auth', authRoute);

app.use(errorHandler);

export default app;
