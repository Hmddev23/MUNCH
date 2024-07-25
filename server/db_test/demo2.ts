
/* 1- Install faker: */
//    |_  $ npm install faker


/* 2- Generate fake data: */
const faker = require('faker');
const mongoose = require('mongoose');
const { Customer } = require('./models/Customer');
const { DeliveryUser } = require('./models/DeliveryUser');
const { Food } = require('./models/Food');
const { Offer } = require('./models/Offer');
const { Order } = require('./models/Order');
const { Transaction } = require('./models/Transaction');
const { Vendor } = require('./models/Vendor');

// Create a connection to your MongoDB database
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
  console.log('Connected to the database');

  // Function to create fake Customer data
  const createFakeCustomer = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.random.alphaNumeric(16),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    verified: faker.random.boolean(),
    otp: faker.random.number({ min: 1000, max: 9999 }),
    otp_expiry: faker.date.future(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    cart: [],
    orders: []
  });

  // Function to create fake DeliveryUser data
  const createFakeDeliveryUser = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.random.alphaNumeric(16),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    pincode: faker.address.zipCode(),
    verified: faker.random.boolean(),
    otp: faker.random.number({ min: 1000, max: 9999 }),
    otp_expiry: faker.date.future(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    isAvailable: faker.random.boolean()
  });

  // Function to create fake Food data
  const createFakeFood = (vendorId) => ({
    vendorId,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    category: faker.commerce.department(),
    foodType: faker.random.arrayElement(['Veg', 'Non-Veg']),
    readyTime: faker.random.number({ min: 10, max: 60 }),
    price: faker.commerce.price(),
    rating: faker.random.number({ min: 1, max: 5 }),
    images: [faker.image.food()]
  });

  // Function to create fake Offer data
  const createFakeOffer = () => ({
    offerType: faker.random.arrayElement(['Discount', 'Cashback']),
    vendors: [],
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    minValue: faker.commerce.price(),
    offerAmount: faker.commerce.price(),
    startValidity: faker.date.future(),
    endValidity: faker.date.future(),
    promocode: faker.random.alphaNumeric(6),
    promoType: faker.random.arrayElement(['Percentage', 'Flat']),
    bank: [faker.company.companyName()],
    bins: [faker.random.number({ min: 1000, max: 9999 })],
    pincode: faker.address.zipCode(),
    isActive: faker.random.boolean()
  });

  // Function to create fake Order data
  const createFakeOrder = (vendorId) => ({
    orderId: faker.random.uuid(),
    vendorId,
    items: [],
    totalAmount: faker.commerce.price(),
    paidAmount: faker.commerce.price(),
    orderDate: faker.date.recent(),
    orderStatus: faker.random.arrayElement(['Pending', 'Completed', 'Cancelled']),
    remarks: faker.lorem.sentence(),
    deliveryId: faker.random.uuid(),
    readyTime: faker.random.number({ min: 10, max: 60 })
  });

  // Function to create fake Transaction data
  const createFakeTransaction = (customer, vendorId, orderId) => ({
    customer,
    vendorId,
    orderId,
    orderValue: faker.commerce.price(),
    offerUsed: faker.random.alphaNumeric(6),
    status: faker.random.arrayElement(['Pending', 'Completed', 'Failed']),
    paymentMode: faker.random.arrayElement(['Credit Card', 'Debit Card', 'UPI', 'Cash']),
    paymentResponse: faker.lorem.sentence()
  });

  // Function to create fake Vendor data
  const createFakeVendor = () => ({
    name: faker.company.companyName(),
    ownerName: faker.name.findName(),
    foodType: [faker.random.arrayElement(['Italian', 'Chinese', 'Indian', 'Mexican'])],
    pincode: faker.address.zipCode(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.random.alphaNumeric(16),
    serviceAvailable: faker.random.boolean(),
    coverImages: [faker.image.business()],
    rating: faker.random.number({ min: 1, max: 5 }),
    foods: [],
    lat: faker.address.latitude(),
    lng: faker.address.longitude()
  });

  // Generate and save fake data
  const createFakeData = async () => {
    const vendors = [];
    for (let i = 0; i < 10; i++) {
      const vendor = new Vendor(createFakeVendor());
      await vendor.save();
      vendors.push(vendor._id);
    }

    const customers = [];
    for (let i = 0; i < 20; i++) {
      const customer = new Customer(createFakeCustomer());
      await customer.save();
      customers.push(customer._id);
    }

    for (let i = 0; i < 50; i++) {
      const deliveryUser = new DeliveryUser(createFakeDeliveryUser());
      await deliveryUser.save();
    }

    for (let i = 0; i < 30; i++) {
      const food = new Food(createFakeFood(faker.random.arrayElement(vendors)));
      await food.save();
    }

    for (let i = 0; i < 10; i++) {
      const offer = new Offer(createFakeOffer());
      await offer.save();
    }

    for (let i = 0; i < 20; i++) {
      const order = new Order(createFakeOrder(faker.random.arrayElement(vendors)));
      await order.save();
    }

    for (let i = 0; i < 20; i++) {
      const transaction = new Transaction(createFakeTransaction(faker.random.arrayElement(customers), faker.random.arrayElement(vendors), faker.random.uuid()));
      await transaction.save();
    }

    console.log('Fake data generated successfully');
    mongoose.connection.close();
  };

  await createFakeData();
});