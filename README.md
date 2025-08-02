# Arvyax Full Stack Wellness Session Platform  

# https://arvyax-da9y.onrender.com/

## 1. Overview

The **Arvyax Full Stack Wellness Session Platform** is a secure, scalable, and interactive web application designed for wellness session management. It allows users to:

- Register and log in securely
- View publicly available wellness sessions
- Create, draft, and publish their own sessions
- Automatically save session drafts at fixed intervals
- Manage their own sessions (edit, delete)
- Maintain session privacy until published

This project was developed for the **Arvyax Full Stack Internship Assignment** and demonstrates best practices in full-stack development, secure authentication, structured APIs, and modular frontend/backend design.

---

## 2. Objectives

- Implement secure authentication using **JWT** and **bcrypt**.
- Enable users to view public wellness sessions.
- Allow users to create and manage their own sessions.
- Provide an **auto-save** feature for drafts to prevent data loss.
- Maintain clear separation of concerns between frontend and backend.
- Ensure modular and maintainable code structure for scalability.

---

## 3. Tech Stack

### Backend
- **Node.js** (Runtime)
- **Express.js** (Web framework)
- **MongoDB** with **Mongoose** (Database & ODM)
- **JWT** (`jsonwebtoken`) for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin resource sharing
- **dotenv** for environment variable management
- **morgan** (development logging)
- **ESLint** with stylistic plugin

### Frontend
- **React.js** with **Vite** (Fast development environment)
- **React Router** for client-side routing
- **Axios** for HTTP requests
- **Tailwind CSS** with **DaisyUI** for UI styling
- **React Hooks** for state management
- **Session Storage** for JWT persistence

---

## 4. Backend Folder Structure

```
backend/
├── controllers/
│   ├── User.js                # User authentication & profile retrieval
│   └── sessionController.js   # Session CRUD operations
├── middleware/
│   └── auth.js                # JWT verification middleware
├── models/
│   ├── user.js                # User schema
│   └── session.js             # Session schema
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   └── sessionRoutes.js       # /api/session routes
├── utils/
│   └── db.js                  # MongoDB connection logic
├── app.js                     # Express app configuration
├── index.js                   # Server entry point
├── package.json
└── .env.example               # Example environment variables
```

---

## 5. Frontend Folder Structure

```
frontend/
├── components/
│   ├── Navbar.jsx             # Navigation bar with auth controls
│   ├── ProtectedRoute.jsx     # Route protection wrapper
│   ├── SessionCard.jsx        # UI card for displaying sessions
│   └── Toast.jsx              # Notification component
├── context/
│   └── AuthProvider.jsx       # Authentication state management
├── hooks/
│   └── useAutoSave.js         # Auto-save logic for forms
├── pages/
│   ├── Home.jsx               # Public sessions listing
│   ├── MySessions.jsx         # User's personal sessions
│   ├── DraftEditor.jsx        # Create/Edit session page with auto-save
│   ├── Login.jsx              # User login form
│   └── Register.jsx           # User registration form
├── services/
│   ├── api.js                 # Axios instance with interceptors
│   ├── authAPI.js             # Auth API functions
│   └── sessionAPI.js          # Session API functions
├── App.jsx                    # Main router
├── index.css                  # Tailwind/DaisyUI styles
├── main.jsx                   # React entry point
├── package.json
└── .env.example               # Example environment variables
```

---

## 6. API Documentation

### Authentication

#### `POST /api/auth/register`
Registers a new user.

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Response**
```json
{
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "email": "user@example.com"
    }
  }
}
```

#### `POST /api/auth/login`
Logs in a user.

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Response**
```json
{
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "email": "user@example.com"
    }
  }
}
```

#### `GET /api/auth/me`
Retrieves current user details.

**Headers**
```
Authorization: Bearer JWT_TOKEN
```

**Response**
```json
{
  "data": {
    "user": {
      "id": "USER_ID",
      "email": "user@example.com"
    }
  }
}
```

---

### Sessions

#### `GET /api/sessions/public`
Returns all published sessions.

**Response**
```json
{
  "data": {
    "sessions": [
      {
        "_id": "SESSION_ID",
        "title": "Yoga for Beginners",
        "description": "A calming beginner-friendly yoga session.",
        "tags": ["yoga", "relaxation"],
        "difficulty": "Beginner",
        "status": "published",
        "user_id": {
          "email": "creator@example.com"
        }
      }
    ]
  }
}
```

#### `GET /api/sessions/my`
Returns all sessions for the authenticated user.

**Headers**
```
Authorization: Bearer JWT_TOKEN
```

#### `GET /api/sessions/my/:id`
Returns a specific session owned by the user.

#### `POST /api/sessions/draft`
Creates or updates a draft session.

**Request Body**
```json
{
  "id": "OPTIONAL_SESSION_ID",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "video_url": "https://example.com/video",
  "description": "Description text",
  "difficulty": "Beginner"
}
```

#### `POST /api/sessions/publish`
Creates or updates and publishes a session.

#### `DELETE /api/sessions/:id`
Deletes a session owned by the user.

---

## 7. Authentication Flow

1. User registers or logs in.
2. Backend generates JWT with 7-day expiry.
3. Frontend stores JWT in **sessionStorage**.
4. Axios interceptor attaches `Authorization: Bearer <token>` to all requests.
5. `auth` middleware verifies token and attaches `req.user`.

---

## 8. Auto-Save Mechanism

The `useAutoSave` hook:
- Tracks form changes.
- Waits for inactivity (`default: 10s`).
- Calls `sessionAPI.saveDraft` automatically.
- Prevents duplicate saves by comparing with previous state.

---

## 9. Local Setup

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 10. Deployment

**Backend** → Render or Railway  
- Add environment variables.
- Deploy from GitHub repo.

**Frontend** → Vercel or Netlify  
- Set API base URL to deployed backend.

---

## 11. Troubleshooting

- **CORS errors** → Check backend CORS whitelist.
- **JWT expired** → Re-login.
- **MongoDB connection issues** → Verify `MONGODB_URI` in `.env`.

---

## 12. Contribution

1. Fork repo.
2. Create feature branch.
3. Commit changes.
4. Open pull request.

---

*End of Documentation*
