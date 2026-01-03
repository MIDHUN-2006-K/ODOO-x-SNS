# GlobeTrotter Full Stack Setup Guide

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (for backend)
- Git

## 🏗️ Project Structure

```
ODOO-x-SNS/
├── node-backend/          # Express.js backend API
│   └── src/
│       ├── routes/        # API endpoints
│       ├── middleware/    # Auth, validation
│       └── prisma/        # Database models
└── frontend/              # Next.js 14 frontend
    └── src/
        ├── app/          # Pages & routing
        ├── components/   # Reusable UI
        └── services/     # API integration
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd node-backend

# Install dependencies
npm install

# Setup environment
# Create .env with:
DATABASE_URL="postgresql://user:password@localhost:5432/globetrotter"
JWT_SECRET="your-secret-key"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Run migrations
npx prisma migrate dev

# Start server
npm start
# Server runs on http://localhost:4000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:3000
```

## 🔗 API Endpoints

All endpoints require JWT token (except login/signup) in header:

```
Authorization: Bearer <token>
```

### Auth Endpoints

- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Trip Endpoints

- `GET /trips?user=true` - Get user's trips
- `POST /trips` - Create trip
- `GET /trips/:id` - Get trip details
- `PATCH /trips/:id` - Update trip
- `DELETE /trips/:id` - Delete trip
- `GET /trips/:id/summary` - Get trip summary
- `POST /trips/:id/copy` - Copy trip

### Stops Endpoints

- `POST /trips/:tripId/stops` - Add stop
- `PATCH /trips/:tripId/stops/:stopId` - Update stop
- `DELETE /trips/:tripId/stops/:stopId` - Delete stop

### Activities Endpoints

- `POST /trips/:tripId/stops/:stopId/activities` - Add activity
- `PATCH /trips/:tripId/activities/:activityId` - Update activity
- `DELETE /trips/:tripId/activities/:activityId` - Delete activity

## 📊 Database Schema

### Users Table

```sql
- user_id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- name (VARCHAR)
- profile_photo (VARCHAR, optional)
- created_at (TIMESTAMP)
```

### Trips Table

```sql
- trip_id (UUID, PK)
- user_id (UUID, FK)
- trip_name (VARCHAR)
- start_date (DATE)
- end_date (DATE)
- description (TEXT, optional)
- is_public (BOOLEAN)
- created_at (TIMESTAMP)
```

### Trip Stops Table

```sql
- stop_id (UUID, PK)
- trip_id (UUID, FK)
- city_id (UUID, FK)
- start_date (DATE)
- end_date (DATE)
- order_index (INT)
```

### Trip Activities Table

```sql
- trip_activity_id (UUID, PK)
- stop_id (UUID, FK)
- activity_id (UUID, FK)
- scheduled_date (DATE)
- custom_cost (DECIMAL, optional)
- notes (TEXT, optional)
```

## 🔐 Authentication Flow

1. User signs up with email/password
2. Backend creates user and returns JWT token
3. Frontend stores token in localStorage
4. For each API request, token is added to Authorization header
5. Backend validates token using JWT_SECRET
6. If token expires (401), user redirected to login

## 🎯 Development Workflow

### Creating a New Feature

1. **Backend**: Add API endpoint in `/node-backend/src/routes/`
2. **Backend**: Add database model in `/prisma/schema.prisma` if needed
3. **Frontend**: Create service function in `/src/services/api.ts`
4. **Frontend**: Create component in `/src/components/`
5. **Frontend**: Add page in `/src/app/` using App Router

### Testing API Locally

```bash
# Using curl
curl -X GET http://localhost:4000/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"

# Using Postman
1. Add token to Authorization tab
2. Set it as Bearer token
3. Make requests to http://localhost:4000
```

## 🐛 Common Issues

### 401 Unauthorized Errors

- **Issue**: Frontend not sending token
- **Fix**: Ensure token is stored in localStorage after login and added to all requests

### CORS Errors

- **Issue**: Frontend and backend on different origins
- **Fix**: Check `CORS_ORIGIN` in backend .env matches frontend URL

### Database Connection Errors

- **Issue**: Cannot connect to PostgreSQL
- **Fix**: Verify DATABASE_URL and PostgreSQL is running

### Token Expired

- **Issue**: Requests failing with 401
- **Fix**: User needs to login again to get new token

## 📈 Next Steps / Features to Add

- ✅ Trip maps (read-only)
- ✅ Budget visualization (charts)
- ✅ Itinerary timeline
- ✅ Public trip sharing
- ⏳ Social features (share trips, comments)
- ⏳ Offline support
- ⏳ PWA capabilities
- ⏳ Mobile app

## 🚀 Deployment

### Backend (Heroku/Railway)

```bash
# Build
npm run build

# Set environment variables on platform
DATABASE_URL=...
JWT_SECRET=...
```

### Frontend (Vercel)

```bash
# Deploy directly from GitHub
# Set NEXT_PUBLIC_API_URL to your backend URL
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 💡 Tips

- Use Redux DevTools to inspect Zustand state
- Check browser Network tab to debug API calls
- Use `console.log()` in backend to debug requests
- Keep sensitive data in .env files
- Test auth flow early in development
