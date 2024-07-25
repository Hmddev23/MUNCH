
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import {
  AddFood,
  AddOffer,
  EditOffer,
  GetFoods,
  GetOffers,
  GetOrderDetails,
  GetOrders,
  ProcessOrder,
  UpdateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin
} from '../controllers';
import { Authenticate } from '../middleware';


const router = express.Router();
const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    // cb(null, new Date().toISOString() + '_' + file.originalname);
    // cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  }
});
const images = multer({ storage: imageStorage }).array('images', 10);

router.get('/login', VendorLogin);

router.use(Authenticate)
router.get('/profile', VendorLogin);
router.patch('/profile', UpdateVendorProfile);
router.patch('/coverimage', images,UpdateVendorCoverImage);
router.patch('/service', UpdateVendorService);

router.post('/food', images,AddFood);
router.get('/food', GetFoods);

// Orders
router.get('/orders', GetOrders);
router.put('/order/:id/process', ProcessOrder);
router.get('/order/:id', GetOrderDetails)

// Offers - Coupons
router.get('/offers', GetOffers);
router.post('/offer', AddOffer);
router.put('/offer/:id', EditOffer);
// Delete Offers

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Hello from Vendor'
  });
});


export { router as VendorRoute };