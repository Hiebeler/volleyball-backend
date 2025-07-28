import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
    console.log("halloo");
    return res.status(200).json({"test": "test"});
})

//app.use(errorHandler);

export default app;