import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

app.use(express());
app.use(cors());

app.use('/v2', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
