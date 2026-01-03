# GlobeTrotter Frontend - Screen Specifications

## 1️⃣ Login Screen (`/login`)

### Features

- Email input with validation
- Password input
- "Sign In" button
- Link to signup page
- Error message display
- Loading state during submit

### API Used

- `POST /auth/login`

### State Managed

- Email, password
- Loading, error states
- Auth store (token, user)

---

## 2️⃣ Signup Screen (`/signup`)

### Features

- Full name input
- Email input with validation
- Password input
- Confirm password input with match validation
- Password strength requirement (min 6 chars)
- "Create Account" button
- Link to login page
- Error message display
- Loading state

### API Used

- `POST /auth/signup`

### Validation Rules

- Email format validation
- Password min 6 characters
- Passwords must match
- Required fields

---

## 3️⃣ Dashboard (`/dashboard`)

### Features

- Welcome message with user name
- "Plan New Trip" button
- Statistics cards:
  - Total trips count
  - Upcoming trips count
  - Total days planned
- Upcoming trips section with:
  - Trip name
  - Date range
  - Description preview
  - Link to trip details

### API Used

- `GET /trips?user=true`
- `GET /auth/me` (via store)

### Loading State

- Grid skeleton (2 cards)

### Empty State

- MapPin icon
- "No upcoming trips" message
- Create trip button

---

## 4️⃣ My Trips (`/trips`)

### Features

- Header with "New Trip" button
- Trip cards displaying:
  - Trip name
  - Date range
  - Stops count
  - Public/Private status
  - Description (truncated)
- Card actions:
  - View button (navigates to details)
  - Copy button (duplicates trip)
  - Delete button (with confirmation)
- Toast notifications for all actions

### API Used

- `GET /trips?user=true`
- `DELETE /trips/:id`
- `POST /trips/:id/copy`

### Loading State

- Grid skeleton (6 cards)

### Empty State

- MapPin icon
- "No trips yet" message
- Create trip button

---

## 5️⃣ Create Trip (`/trips/create`)

### Features

- Form with fields:
  - Trip name (text input)
  - Start date (date picker)
  - End date (date picker)
  - Description (textarea)
- Create and Cancel buttons
- Form validation:
  - Required fields
  - End date > start date
- Error message display
- Loading state on submit

### API Used

- `POST /trips`

### On Success

- Redirect to trip details page
- Show success toast

---

## 6️⃣ Trip Details (`/trips/[id]`)

### Features

#### Header Section

- Back to trips link
- Trip name
- Trip description
- Edit trip button
- Trip dates
- Public/Private badge

#### Stops Section

- Add stop button
- List of stops with:
  - Stop number badge
  - City name & country
  - Stop dates
  - Activities list (if any)
  - Delete button

#### Add Stop Form (Modal-like)

- City dropdown (searchable)
- Start date input
- End date input
- Submit and Cancel buttons

### API Used

- `GET /trips/:id?expand=stops,activities`
- `POST /trips/:id/stops`
- `DELETE /trips/:id/stops/:stopId`

### Loading State

- Card skeleton

### Empty State (No Stops)

- MapPin icon
- "No stops added yet" message

---

## 7️⃣ User Profile (`/profile`)

### Features

- Display user information:
  - Email (read-only)
  - Full name (read-only)
  - Member since date
- Logout button in danger zone
- Account information section

### API Used

- `GET /auth/me`
- Logout (local storage clear)

### On Logout

- Clear auth store
- Navigate to login page
- Show success toast

---

## 🏗️ Component Hierarchy

```
Layout
├── Navbar (all pages)
├── Page Content
│   ├── Dashboard
│   │   ├── Stats Cards
│   │   └── Trip Cards
│   ├── My Trips
│   │   └── Trip Cards
│   ├── Create Trip
│   │   └── Form
│   ├── Trip Details
│   │   ├── Trip Header
│   │   └── Stops Section
│   │       └── Add Stop Form
│   ├── Login/Signup
│   │   └── Auth Form
│   └── Profile
│       └── User Info
└── Toast Notifications
```

---

## 📊 Data Flow

### Authentication Flow

1. User → Login page
2. Enter credentials
3. API call to `/auth/login`
4. Store token in localStorage
5. Store user in Zustand
6. Redirect to dashboard

### Trip Viewing Flow

1. User → Dashboard
2. Click "My Trips"
3. Fetch trips from API
4. Display trip cards
5. Click trip → Details page
6. Show stops and activities

### Trip Creation Flow

1. Click "Create Trip"
2. Fill form
3. Validate on client
4. Submit to API
5. Redirect to trip details
6. Start adding stops

---

## 🎨 Responsive Behavior

### Mobile (< 768px)

- Stack layouts vertically
- Full-width buttons
- Single column cards
- Mobile menu in navbar

### Tablet (768px - 1024px)

- 2 column grid for cards
- Horizontal forms

### Desktop (> 1024px)

- 3-4 column grid for cards
- Side-by-side layouts
- Expanded content

---

## 🔄 State Management

### Auth Store (Zustand)

```typescript
{
  user: User | null,
  token: string | null,
  isLoading: boolean,
  error: string | null,
  setUser, setToken, setLoading, setError, logout
}
```

### Trip Store (Zustand)

```typescript
{
  trips: Trip[],
  selectedTrip: Trip | null,
  isLoading: boolean,
  error: string | null,
  setTrips, setSelectedTrip, setLoading, setError
}
```

### Local Component State

- Form inputs (useState)
- UI toggles (useState)
- Async operations (useState)

---

## ⚠️ Error Handling

All pages have:

- Try/catch blocks for API calls
- User-friendly error messages
- Alert component display
- Console error logging

Common errors handled:

- 401 (Unauthorized) → Redirect to login
- 404 (Not Found) → Show empty state
- Network errors → Show error alert
- Validation errors → Show in form

---

## 🎯 UI/UX Standards

All pages follow:

- **Loading**: Show skeleton/spinner
- **Empty**: Show empty state component
- **Error**: Show alert with message
- **Success**: Show toast notification
- **Responsive**: Mobile-first design
- **Accessibility**: Semantic HTML
- **Typography**: Clear hierarchy

---

## 🔐 Authentication Requirements

Protected pages:

- ✅ `/dashboard` - Requires auth
- ✅ `/trips` - Requires auth
- ✅ `/trips/create` - Requires auth
- ✅ `/trips/[id]` - Requires auth
- ✅ `/profile` - Requires auth

Public pages:

- 🔓 `/login` - No auth
- 🔓 `/signup` - No auth
- 🔓 `/` - Redirects based on auth

---

## 📈 Performance Features

- Skeleton loaders for perceived speed
- Lazy loading of routes
- CSS minification with Tailwind
- Image optimization
- Component memoization (if needed)
- Debouncing on search inputs (ready)

---

## ✅ Testing Scenarios

### Happy Path

1. Signup with new account
2. See empty dashboard
3. Create a trip
4. Add stops to trip
5. View trip details
6. Delete trip
7. Logout

### Error Scenarios

1. Login with wrong password → Error message
2. Create trip with invalid dates → Validation error
3. Delete trip → Confirmation dialog
4. Network error → Error alert
5. Session expires → Redirect to login

---

**Last Updated**: January 3, 2026
**Status**: All screens implemented and functional ✅
