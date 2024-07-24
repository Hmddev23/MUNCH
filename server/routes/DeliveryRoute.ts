
import express from 'express';

import {
  DeliveryLogin,
  DeliverySignUp,
  EditDeliveryProfile,
  GetDeliveryProfile,
  UpdateDeliveryUserStatus
} from '../controllers';
import { Authenticate } from '../middleware';


const router = express.Router();

/* --- Signup / Create Delivery --- */
router.post('/signup', DeliverySignUp);

/* --- Login --- */
router.post('/login', DeliveryLogin);

// authentication
router.use(Authenticate);

/* --- Change Service Status --- */
router.put('/change-status', UpdateDeliveryUserStatus);

/* --- Profile --- */
router.get('/profile', GetDeliveryProfile);
router.patch('/profile', EditDeliveryProfile);


export { router as DeliveryRoute };