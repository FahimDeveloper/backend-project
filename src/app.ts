/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
