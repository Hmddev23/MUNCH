
import express from 'express';
import 'dotenv/config';

import { App, dbConnection } from './services';


const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 8000;

  await dbConnection(process.env.MONGO_URI);
  await App(app);

  app.listen(
    port,
    () => {
      console.clear();
      console.log(`server listening on port ${port}...`);
    }
  );
}

startServer();