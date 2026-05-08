import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRoute from './routers';

dotenv.config();

const port = process.env.PORT || 3001;
const app: express.Application = express();
const address: string = `127.0.0.1:3001`;

app.use(cors());
app.use(bodyParser.json());

//mount ONE main router
app.use('/', mainRoute);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
