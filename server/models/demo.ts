
/* --- Customer --- */
const customer = [
  {
    "email": "john.doe@example.com",
    "password": "hashedpassword123",
    "salt": "randomsalt",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St, Anytown, USA",
    "phone": "+1234567890",
    "verified": true,
    "otp": 1234,
    "otp_expiry": "2024-12-31T23:59:59.999Z",
    "lat": 37.7749,
    "lng": -122.4194,
    "cart": [],
    "orders": []
  },
  {
    "email": "jane.smith@example.com",
    "password": "hashedpassword456",
    "salt": "randomsalt",
    "firstName": "Jane",
    "lastName": "Smith",
    "address": "456 Elm St, Othertown, USA",
    "phone": "+0987654321",
    "verified": false,
    "otp": 5678,
    "otp_expiry": "2025-01-01T23:59:59.999Z",
    "lat": 34.0522,
    "lng": -118.2437,
    "cart": [],
    "orders": []
  }
]




/* --- DeliveryUser --- */
const deliveryUsers = [
  {
    "email": "delivery.joe@example.com",
    "password": "hashedpassword789",
    "salt": "randomsalt",
    "firstName": "Joe",
    "lastName": "Delivery",
    "address": "789 Oak St, Deliverytown, USA",
    "phone": "+1231231234",
    "pincode": "12345",
    "verified": true,
    "otp": 7890,
    "otp_expiry": "2025-06-30T23:59:59.999Z",
    "lat": 40.7128,
    "lng": -74.0060,
    "isAvailable": true
  },
  {
    "email": "delivery.ann@example.com",
    "password": "hashedpassword012",
    "salt": "randomsalt",
    "firstName": "Ann",
    "lastName": "Delivery",
    "address": "101 Pine St, Deliverycity, USA",
    "phone": "+3213213210",
    "pincode": "54321",
    "verified": false,
    "otp": 3456,
    "otp_expiry": "2025-07-01T23:59:59.999Z",
    "lat": 51.5074,
    "lng": -0.1278,
    "isAvailable": false
  }
]




/* --- Food --- */
const foods = [
  {
    "vendorId": "vendor1",
    "name": "Cheese Pizza",
    "description": "A delicious cheese pizza with a crispy crust.",
    "category": "Italian",
    "foodType": "Veg",
    "readyTime": 15,
    "price": 9.99,
    "rating": 4.5,
    "images": ["http://example.com/cheese_pizza.jpg"]
  },
  {
    "vendorId": "vendor2",
    "name": "Chicken Burger",
    "description": "A juicy chicken burger with fresh lettuce and tomatoes.",
    "category": "American",
    "foodType": "Non-Veg",
    "readyTime": 10,
    "price": 7.99,
    "rating": 4.0,
    "images": ["http://example.com/chicken_burger.jpg"]
  }
]




/* --- Offer --- */
const offers = [
  {
    "offerType": "Discount",
    "vendors": ["vendor1", "vendor2"],
    "title": "Summer Sale",
    "description": "Get 20% off on all items!",
    "minValue": 20.00,
    "offerAmount": 5.00,
    "startValidity": "2024-07-01T00:00:00.000Z",
    "endValidity": "2024-07-31T23:59:59.999Z",
    "promocode": "SUMMER20",
    "promoType": "Percentage",
    "bank": ["Bank A", "Bank B"],
    "bins": [1234, 5678],
    "pincode": "12345",
    "isActive": true
  },
  {
    "offerType": "Cashback",
    "vendors": ["vendor3"],
    "title": "New Year Offer",
    "description": "Get $10 cashback on orders above $50!",
    "minValue": 50.00,
    "offerAmount": 10.00,
    "startValidity": "2024-12-25T00:00:00.000Z",
    "endValidity": "2025-01-01T23:59:59.999Z",
    "promocode": "NEWYEAR",
    "promoType": "Flat",
    "bank": ["Bank C"],
    "bins": [9876, 5432],
    "pincode": "54321",
    "isActive": true
  }
]




/* --- Order --- */
const orders = [
  {
    "orderId": "order123",
    "vendorId": "vendor1",
    "items": [
      {
        "food": "food1",
        "unit": 2
      }
    ],
    "totalAmount": 19.98,
    "paidAmount": 19.98,
    "orderDate": "2024-07-22T12:34:56.789Z",
    "orderStatus": "Completed",
    "remarks": "Leave at the door.",
    "deliveryId": "delivery1",
    "readyTime": 20
  },
  {
    "orderId": "order456",
    "vendorId": "vendor2",
    "items": [
      {
        "food": "food2",
        "unit": 1
      }
    ],
    "totalAmount": 7.99,
    "paidAmount": 7.99,
    "orderDate": "2024-07-23T14:23:45.678Z",
    "orderStatus": "Pending",
    "remarks": "Ring the bell.",
    "deliveryId": "delivery2",
    "readyTime": 15
  }
]




/* --- Transaction --- */
const transations = [
  {
    "customer": "customer1",
    "vendorId": "vendor1",
    "orderId": "order123",
    "orderValue": 19.98,
    "offerUsed": "SUMMER20",
    "status": "Completed",
    "paymentMode": "Credit Card",
    "paymentResponse": "Success"
  },
  {
    "customer": "customer2",
    "vendorId": "vendor2",
    "orderId": "order456",
    "orderValue": 7.99,
    "offerUsed": "",
    "status": "Pending",
    "paymentMode": "UPI",
    "paymentResponse": "Pending"
  }
]




/* --- Vendor --- */
const vendors = [
  {
    "name": "Pizza Palace",
    "ownerName": "Mario",
    "foodType": ["Italian"],
    "pincode": "12345",
    "address": "123 Pizza St, Pizzatown, USA",
    "phone": "+1231231234",
    "email": "mario@pizzapalace.com",
    "password": "hashedpasswordabc",
    "salt": "randomsalt",
    "serviceAvailable": true,
    "coverImages": ["http://example.com/pizza_palace.jpg"],
    "rating": 4.7,
    "foods": ["food1"],
    "lat": 37.7749,
    "lng": -122.4194
  },
  {
    "name": "Burger Bonanza",
    "ownerName": "Ronald",
    "foodType": ["American"],
    "pincode": "54321",
    "address": "456 Burger Blvd, Burgertown, USA",
    "phone": "+3213213210",
    "email": "ronald@burgerbonanza.com",
    "password": "hashedpasswordxyz",
    "salt": "randomsalt",
    "serviceAvailable": false,
    "coverImages": ["http://example.com/burger_bonanza.jpg"],
    "rating": 4.3,
    "foods": ["food2"],
    "lat": 34.0522,
    "lng": -118.2437
  }
]