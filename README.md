# Gledam Application

## Project Structure
- `Backend/` - Node.js/Express backend with MongoDB
- `Frontend/` - React/Vite frontend with Tailwind CSS

## Setup Instructions

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ADMIN_EMAIL1=admin1@example.com
   ADMIN_EMAIL2=admin2@example.com
   APP_EMAIL=your_email@gmail.com
   APP_PASSWORD=your_app_password
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variable:
   ```
   VITE_API_BASE=http://localhost:5001
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

## Testing Authentication

1. Start both the backend and frontend servers
2. Visit `http://localhost:5173/auth-test` to test authentication functionality
3. You can signup, login, and view your profile

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/checkAuth` - Check if user is authenticated
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend verification OTP
- `POST /api/auth/forgetPassword` - Request password reset
- `POST /api/auth/resetPassword` - Reset password with OTP
- `POST /api/auth/change-password` - Change password (authenticated)

## Common Issues and Solutions

1. **CORS Errors**: Make sure the frontend and backend are running on the correct ports (5173 and 5001)
2. **Authentication Failures**: Check that JWT_SECRET is set in the backend .env file
3. **Database Connection Issues**: Verify the MONGO_URL in the backend .env file