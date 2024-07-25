
import express , { Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import { 
  AdminRoute,
  VendorRoute,
  ShoppingRoute,
  CustomerRoute,
  DeliveryRoute
} from '../routes';


export const App = async (app: Application) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  });
  
  app.use(limiter);
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded( { extended: true } ))  
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/admin', AdminRoute);
  app.use('/vendor', VendorRoute);
  app.use('/customer', CustomerRoute);
  app.use('/delivery', DeliveryRoute);
  app.use(ShoppingRoute);

  app.get('/', (req, res) => {
    res.status(200).json({
      'message': 'hello world'
    });
  })

  return app;
}