import express from 'express';
import authRoute from './routes/auth.route';
import teamRoute from './routes/team.route';
import tableRoute from './routes/table.route';
import { errorHandler } from './middlewares/errorHandler';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/teams', teamRoute);
app.use('/api/tables', tableRoute);

app.use(errorHandler);

export default app;
