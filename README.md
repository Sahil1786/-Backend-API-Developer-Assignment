# Activity Booking API

A RESTful API for a basic activity booking application built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication with JWT
- Public activity listing
- Activity booking for authenticated users
- View user's bookings
- Cancel bookings

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT Token-based auth
- **Validation**: Joi
- **Password Hashing**: bcrypt

## Project Structure

\`\`\`
activity-booking-api/
├── app.js                  # Entry point
├── package.json            # Dependencies
├── .env                    # Environment variables
├── controllers/            # Request handlers
│   ├── auth.controller.js
│   ├── activity.controller.js
│   └── booking.controller.js
├── models/                 # Database models
│   ├── user.model.js
│   ├── activity.model.js
│   └── booking.model.js
├── routes/                 # API routes
│   ├── auth.routes.js
│   ├── activity.routes.js
│   └── booking.routes.js
├── middleware/             # Custom middleware
│   └── auth.middleware.js
└── utils/                  # Utility functions
    └── validation.js
\`\`\`

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get JWT token

### Activities

- **GET /api/activities** - Get all activities (public)
- **GET /api/activities/:id** - Get a specific activity (public)
- **POST /api/activities** - Create a new activity (protected)

### Bookings

- **POST /api/bookings** - Book an activity (protected)
- **GET /api/bookings/my-bookings** - Get all bookings for logged-in user (protected)
- **DELETE /api/bookings/:id** - Cancel a booking (protected)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file in the root directory with the following variables:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/activity-booking-app
   JWT_SECRET=sahilhossain
   PORT=5000
   NODE_ENV=development
   \`\`\`

4. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

5. The API will be available at `http://localhost:5000`

## Testing with Postman

A Postman collection is included in the repository. Import the collection to test all API endpoints.

## Deployment

This API can be deployed to platforms like Render, Vercel, or Cyclic.

## License

This project is licensed under the ISC License.
# -Backend-API-Developer-Assignment
