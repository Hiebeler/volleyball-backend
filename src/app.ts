import express from 'express';
import authRoute from './routes/auth.route';
import teamRoute from './routes/team.route';
import tableRoute from './routes/table.route';
import gameRoute from './routes/game.route';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';

dotenv.config();
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/teams', teamRoute);
app.use('/api/tables', tableRoute);
app.use('/api/games', gameRoute);

app.use(errorHandler);

export default app;
