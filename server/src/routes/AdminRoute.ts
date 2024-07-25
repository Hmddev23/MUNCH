
import express, { Request, Response, NextFunction } from 'express';

import {
  CreateVendor,
  GetDeliveryUsers,
  GetTransactionById,
  GetTransactions,
  GetVendorByID,
  GetVanndors,
  VerifyDeliveryUser
} from '../controllers';


const router = express.Router();

router.get('/vendors', GetVanndors);
router.get('/vendor/:id', GetVendorByID);
router.post('/vendor', CreateVendor);

router.get('/transactions', GetTransactions);
router.get('/transaction/:id', GetTransactionById);

router.put('/delivery/verify', VerifyDeliveryUser);
router.get('/delivery/users', GetDeliveryUsers);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Hello from  Admin Route"
  });
});


export { router as AdminRoute };