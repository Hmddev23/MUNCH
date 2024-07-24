
import express from 'express';

import {
  GetAvailableOffers,
  GetFoodAvailability,
  GetFoodsIn30Min,
  GetTopRestaurants,
  RestaurantById,
  SearchFoods
} from '../controllers';


const router = express.Router();

/* --- Food Availability --- */
router.get('/:pincode', GetFoodAvailability);

/* --- Top Restaurants --- */
router.get('/top-restaurant/:pincode', GetTopRestaurants);

/* --- Foods Availabe in 30 Minutes --- */
router.get('/foods-in-30-min/:pincode', GetFoodsIn30Min);

/* --- Search Foods --- */
router.get('/search/:pincode', SearchFoods);

/* Find Offers */
router.get('/offers/:pincode', GetAvailableOffers);

/* --- Find Restaurant By ID --- */
router.get('/restaurant/:id', RestaurantById);


export { router as ShoppingRoute };