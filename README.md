# Munch

Munch is a web application designed for food delivery services. It connects customers with various vendors, delivery personnel, and administrators to ensure a seamless food ordering and delivery experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- User authentication and authorization
- Rate limiting for enhanced security
- CORS support for cross-origin requests
- Helmet for security headers
- API routes for admin, vendors, customers, and delivery personnel
- MongoDB integration

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Hmddev23/munch.git
    cd munch
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=8000
    MONGO_URI=your_mongo_db_uri
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## Usage

### Starting the Server

To start the server, run:
```bash
npm run start
```


The server will listen on the port specified in your .env file or default to port 8000.
API Routes

    /admin - Admin related routes
    /vendor - Vendor related routes
    /customer - Customer related routes
    /delivery - Delivery personnel related routes
    /shopping - General shopping routes

Example Request

Send a GET request to the root endpoint to verify the server is running:
```bash
curl http://localhost:8000/
```

Response:
```bash
{
  "message": "hello world"
}
```


## Scripts

- dev: Run the server in development mode using nodemon
- start: Run the server using ts-node
- build: Compile TypeScript to JavaScript
- vercel-build: Custom build script for Vercel


## Dependencies

- `express`: Web framework for Node.js
- `dotenv`: Loads environment variables from a .env file
- `express-rate-limit`: Basic rate-limiting middleware for Express
- `cors`: Middleware to enable CORS
- `helmet`: Security middleware for HTTP headers
- `mongoose`: MongoDB object modeling tool
- `bcrypt`: Library to hash passwords
- `jsonwebtoken`: Library to work with JSON Web Tokens
- `class-transformer`, class-validator: Libraries for data transformation and validation
- `multer`: Middleware for handling multipart/form-data
- `swagger-ui-express`: Middleware to serve auto-generated swagger API docs
- `twilio`: Twilio API client for Node.js

## License

This project is licensed under the ISC License. See the [LICENSE](https://github.com/Hmddev23/MUNCH/blob/main/README.md) file for details.