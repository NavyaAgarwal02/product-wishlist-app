# Product Wishlist App

A collaborative shopping experience where users can create, manage, and share wishlists with others.

## Features

- User authentication (signup/login)
- Create and manage wishlists
- Add, edit, and remove products (name, image URL, price)
- Invite others to join wishlists
- Track who added which items
- Responsive, mobile-friendly UI
- Timestamps for all actions
- Real-time updates

## Tech Stack

### Frontend
- React.js
- Axios for API calls
- Local storage for session management
- Modern CSS with Flexbox and Grid

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

### Database
- MongoDB Atlas

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/NavyaAgarwal02/product-wishlist-app.git
cd product-wishlist-app
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Create a `.env` file in the frontend directory with:
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

4. Start the application:

In the backend directory:
```bash
npm start
```

In a new terminal, in the frontend directory:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new user
- POST `/api/auth/login` - Login user

### Wishlists
- GET `/api/wishlists/:email` - Get all wishlists for user
- POST `/api/wishlists` - Create new wishlist
- PUT `/api/wishlists/:id` - Update wishlist
- DELETE `/api/wishlists/:id` - Delete wishlist
- POST `/api/wishlists/:wishlistId/invite` - Invite user to wishlist

## Assumptions and Limitations

1. Authentication is simplified for demo purposes
2. No password protection implemented
3. Images are stored as URLs, not files
4. No real-time updates (would require WebSocket implementation)
5. Limited error handling
6. No input validation on the frontend

## Future Improvements

1. Add proper authentication with passwords and JWT
2. Implement WebSocket for real-time updates
3. Add image upload functionality
4. Add comments and emoji reactions to products
5. Implement proper error handling and input validation
6. Add product categories and sorting
7. Add email notifications for invites
8. Implement a proper design system
9. Add unit and integration tests
10. Add CI/CD pipeline

## Screenshots

### SignUp & Login
![Screenshot 1](/screenshots/signup.png)

### Email
![Screenshot 2](/screenshots/email.png)

### Password
![Screenshot 3](/screenshots/password.png)

### Wishlist
![Screenshot 4](/screenshots/wishlist.png)

### Product
![Screenshot 5](/screenshots/product.png)

### Invitation
![Screenshot 6](/screenshots/invitation.png)

### After Invitation
![Screenshot 7](/screenshots/afterInvitation.png)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
