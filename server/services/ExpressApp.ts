
import express , { Application } from 'express';
import path from 'path';

import { 
  AdminRoute,
  VandorRoute,
  ShoppingRoute,
  CustomerRoute,
  DeliveryRoute
} from '../routes';


export const App = async (app: Application) => {  
  app.use(express.json());
  app.use(express.urlencoded( { extended: true } ))  
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/admin', AdminRoute);
  app.use('/vendor', VandorRoute)
  app.use('/customer', CustomerRoute)
  app.use('/delivery', DeliveryRoute);
  app.use(ShoppingRoute);

  return app;
}