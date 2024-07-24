
import express, { Request, Response ,NextFunction } from 'express';

import { Food, Offer, Order } from '../models';
import { FindVendor } from './AdminController';
import { GenerateSignature, ValidatePassword } from '../utility';
import {
  CreateFoodInput,
  CreateOfferInputs,
  EditVendorInput,
  VendorLoginInput
} from '../dto';


export const VendorLogin = async (req: Request,res: Response, next: NextFunction) => {
  const { email, password } = <VendorLoginInput>req.body;
  const existingUser = await FindVendor('', email);

  if(existingUser !== null) {
    // validation and give access
    const validation = await ValidatePassword(password, existingUser.password, existingUser.salt);

    if(validation) {
      const signature = await GenerateSignature({
        _id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
      });

      return res.json(signature);
    }
    else
    {
      return res.json({
        'message': 'Password is not valid'
      });
    }
  }

  return res.json({
    'message': 'Login credentials are not valid'
  });
}

export const GetVendorProfile = async (req: Request,res: Response, next: NextFunction) => {
  const user = req.user;
     
  if(user) {
    const existingVendor = await FindVendor(user._id);
    return res.json(existingVendor);
  }

  return res.json({
    'message': 'Vendor Information Not Found!'
  });
}

export const UpdateVendorProfile = async (req: Request,res: Response, next: NextFunction) => {
  const user = req.user;
  const { foodType, name, address, phone} = <EditVendorInput>req.body;

  if(user) {
    const existingVendor = await FindVendor(user._id);

    if(existingVendor !== null) {
      existingVendor.name = name;
      existingVendor.address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodType;
      const saveResult = await existingVendor.save();

      return res.json(saveResult);
    }
  }
 
  return res.json({
    'message': 'Unable to Update Vendor profile'
  });
}

export const UpdateVendorCoverImage = async (req: Request,res: Response, next: NextFunction) => {
  const user = req.user;

  if(user) {
    const vendor = await FindVendor(user._id);

    if(vendor !== null) {
      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      vendor.coverImages.push(...images);
      const saveResult = await vendor.save();

      return res.json(saveResult);
    }
  }

  return res.json({
    'message': 'Something went wrong, cant update Vendor cover image'
  });
}

export const UpdateVendorService = async (req: Request,res: Response, next: NextFunction) => {
  const user = req.user;
  const { lat, lng} = req.body;

  if(user) {
    const existingVendor = await FindVendor(user._id);

    if(existingVendor !== null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

      if(lat && lng) {
        existingVendor.lat = lat;
        existingVendor.lng = lng;
      }
      const saveResult = await existingVendor.save();

      return res.json(saveResult);
    }
  }

  return res.json({
    'message': 'Unable to Update Vendor Service!'
  });
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const {
    name,
    description,
    category,
    foodType,
    readyTime,
    price
  } = <CreateFoodInput>req.body;
   
  if(user) {
    const vendor = await FindVendor(user._id);

    if(vendor !== null) {
      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      const food = await Food.create({
        vendorId: vendor._id,
        name: name,
        description: description,
        category: category,
        price: price,
        rating: 0,
        readyTime: readyTime,
        foodType: foodType,
        images: images
      });
      vendor.foods.push(food);
      const result = await vendor.save();

      return res.json(result);
    }
  }

  return res.json({
    'message': 'Something went wrong, Unable to Add Food information!'
  });
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if(user) {
    const foods = await Food.find({ vendorId: user._id});

    if(foods !== null) {
      return res.json(foods);
    }
  }

  return res.json({
    'message': 'Foods information Not found'
  });
}

export const GetCurrentOrders = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if(user) {
    const orders = await Order.find({
      vendorId: user._id
    }).populate('items.food');

    if(orders != null) {
      return res.status(200).json(orders);
    }
  }

  return res.json({
    'message': 'current Orders Not found'
  });
}

export const GetOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id;

  if(orderId) {
    const order = await Order.findById(orderId).populate('items.food');

    if(order != null) {
      return res.status(200).json(order);
    }
  }

  return res.json({
    'message': 'Order Not Found!'
  });
}

export const ProcessOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id;
  const { status, remarks, time } = req.body;
  // ACCEPT, REJECT, UNDER-PROCESS, READY

  if(orderId) {
    const order = await Order.findById(orderId).populate('food');

    if(order) {
      order.orderStatus = status;
      order.remarks = remarks;
  
      if(time) {
        order.readyTime = time;
      }
  
      const orderResult = await order.save();
  
      if(orderResult != null) {
          return res.status(200).json(orderResult);
      }
    }
    else {
      return res.status(400).json({
        'message': 'Cant find the order'
      });
    }
  }

  return res.status(400).json({
    'message': 'Unable to process order'
  });
}

export const GetOffers = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if(user) {
    let currentOffer = Array();
    const offers = await Offer.find().populate('vendors');

    if(offers) {
      offers.map(item => {
        if(item.vendors) {
          item.vendors.map(vendor => {
            if(vendor._id.toString() === user._id) {
              currentOffer.push(item);
            }
          });
        }

        if(item.offerType === 'GENERIC') {
          currentOffer.push(item);
        }
      });
    }

    return res.status(200).json(currentOffer);
  }

  return res.status(400).json({
    'message': 'Unable to Get Offers!'
  });
}

export const AddOffer = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if(user) {
    const {
      title,
      description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      promoType,
      startValidity,
      endValidity,
      bank,
      bins,
      minValue,
      isActive
    } = <CreateOfferInputs>req.body;
    const vendor = await FindVendor(user._id);

    if(vendor) {
      const offer = await Offer.create({
        title,
        description,
        offerType,
        offerAmount,
        pincode,
        promoType,
        startValidity,
        endValidity,
        bank,
        isActive,
        minValue,
        vendor:[vendor]
      });

      return res.status(200).json(offer);
    }
  }

  return res.status(400).json({
    'message': 'Unable to Add Offer!'
  });
}

export const EditOffer = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const offerId = req.params.id;

  if(user) {
    const {
      title,
      description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      promoType,
      startValidity,
      endValidity,
      bank,
      bins,
      minValue,
      isActive
    } = <CreateOfferInputs>req.body;
    const currentOffer = await Offer.findById(offerId);

    if(currentOffer) {
      const vendor = await FindVendor(user._id);

      if(vendor) {
        currentOffer.title = title,
        currentOffer.description = description,
        currentOffer.offerType = offerType,
        currentOffer.offerAmount = offerAmount,
        currentOffer.pincode = pincode,
        currentOffer.promoType = promoType,
        currentOffer.startValidity = startValidity,
        currentOffer.endValidity = endValidity,
        currentOffer.bank = bank,
        currentOffer.isActive = isActive,
        currentOffer.minValue = minValue;

        const result = await currentOffer.save();

        return res.status(200).json(result);
      }      
    }
  }

  return res.status(400).json({
    'message': 'Unable to Edit Offer!'
  });
}