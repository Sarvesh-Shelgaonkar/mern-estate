# ⚙️ Middleware Architecture - MERN Estate

## 📋 Middleware Overview

**Middleware** = Functions that execute during the request-response cycle. They have access to `req`, `res`, and `next` objects.

```javascript
// Middleware function structure
const middleware = (req, res, next) => {
  // Do something with request/response
  next(); // Pass control to next middleware
};
```

## 🔄 Middleware Flow in Your Project

```
Request → Express.json() → CookieParser → Custom Auth → Route Handler → Error Handler → Response
```

## 🛠️ Built-in Middlewares Used

### **1. express.json() - Body Parser**
```javascript
// api/index.js
app.use(express.json());
```

**Purpose:**
- Parses incoming JSON requests
- Adds parsed data to `req.body`
- Handles Content-Type: application/json

**Example:**
```javascript
// Frontend sends:
fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: '123456' })
});

// Backend receives:
// req.body = { email: 'user@example.com', password: '123456' }
```

### **2. cookie-parser - Cookie Handling**
```javascript
// api/index.js
import cookieParser from "cookie-parser";
app.use(cookieParser());
```

**Purpose:**
- Parses cookies from request headers
- Makes cookies available in `req.cookies`
- Essential for JWT token retrieval

**Example:**
```javascript
// Cookie set by server:
res.cookie("access_token", token, { httpOnly: true });

// Middleware makes it available:
// req.cookies.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **3. express.static() - Static File Serving**
```javascript
// api/index.js
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
```

**Purpose:**
- Serves static files (HTML, CSS, JS, images)
- Serves React build files in production
- Handles client-side routing fallback

## 🔐 Custom Authentication Middleware

### **1. verifyToken Middleware**
```javascript
// api/utils/verifyUser.js
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Step 1: Extract token from cookies
  const token = req.cookies.access_token;

  // Step 2: Check if token exists
  if (!token) return next(errorHandler(401, "Unauthorized"));

  // Step 3: Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    // Step 4: Add user info to request object
    req.user = user;
    
    // Step 5: Pass control to next middleware/route handler
    next();
  });
};
```

**How it works:**
```javascript
// Route with authentication
router.post('/create', verifyToken, createListing);

// Flow:
// 1. Request comes in
// 2. verifyToken middleware runs
// 3. If valid token: req.user = { id: "user_id" }
// 4. createListing controller runs with access to req.user
// 5. If invalid token: Error response sent
```

### **2. Usage in Protected Routes**
```javascript
// api/routes/listing.route.js
import { verifyToken } from '../utils/verifyUser.js';

// Protected routes (require authentication)
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);

// Public routes (no authentication needed)
router.get('/get/:id', getListing);
router.get('/get', getListings);
```

## 🚨 Error Handling Middleware

### **1. Global Error Handler**
```javascript
// api/index.js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
```

**Purpose:**
- Catches all errors from previous middlewares
- Provides consistent error response format
- Prevents app crashes
- Must be defined AFTER all other middlewares

### **2. Custom Error Creator**
```javascript
// api/utils/error.js
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
```

**Usage:**
```javascript
// In controllers
if (!validUser) return next(errorHandler(404, "User not found!"));
if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
```

## 🔄 Middleware Execution Order

### **1. Application-level Middlewares**
```javascript
// api/index.js
app.use(express.json());        // 1st - Parse JSON bodies
app.use(cookieParser());        // 2nd - Parse cookies

// Routes
app.use("/api/user", userRouter);     // 3rd - User routes
app.use("/api/auth", authRouter);     // 4th - Auth routes  
app.use("/api/listing", listingRouter); // 5th - Listing routes

// Static files
app.use(express.static(path.join(__dirname, "/client/dist"))); // 6th

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
}); // 7th

// Error handler (MUST be last)
app.use((err, req, res, next) => { /* ... */ }); // 8th
```

### **2. Route-level Middlewares**
```javascript
// api/routes/listing.route.js
router.post('/create', verifyToken, createListing);
//                     ↑           ↑
//                middleware    route handler
```

**Execution Flow:**
```
Request → verifyToken → createListing → Response
```

## 🛡️ Security Middlewares

### **1. CORS Middleware (Can be added)**
```javascript
// For cross-origin requests
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### **2. Rate Limiting Middleware (Can be added)**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### **3. Helmet Middleware (Can be added)**
```javascript
const helmet = require('helmet');
app.use(helmet()); // Sets various HTTP headers for security
```

## 📝 Logging Middleware (Can be added)

### **1. Morgan for HTTP Logging**
```javascript
const morgan = require('morgan');
app.use(morgan('combined')); // Logs all HTTP requests
```

### **2. Custom Logging Middleware**
```javascript
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

app.use(logger);
```

## 🔄 Middleware in Frontend (React)

### **1. Redux Middleware**
```javascript
// client/src/redux/store.js
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Middleware configuration
    }),
});
```

### **2. React Router Middleware (Private Routes)**
```javascript
// client/src/components/PrivateRouter.jsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouter() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Acts as middleware for protected routes
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
```

**Usage:**
```javascript
// client/src/App.jsx
<Route element={<PrivateRouter />}>
  <Route path="/profile" element={<Profile />} />
  <Route path="/create-listing" element={<CreateListing />} />
  <Route path="/update-listing/:listingId" element={<UpdateListing />} />
</Route>
```

## 🎯 Middleware Best Practices in Your Project

### **1. Order Matters**
```javascript
// ✅ Correct order
app.use(express.json());      // Parse body first
app.use(cookieParser());      // Parse cookies
app.use('/api/auth', authRouter); // Routes
app.use(errorHandler);        // Error handler last

// ❌ Wrong order
app.use(errorHandler);        // Error handler first (won't catch errors)
app.use(express.json());      // Body parser after routes
```

### **2. Error Handling**
```javascript
// Always use next() for error handling
if (!token) return next(errorHandler(401, "Unauthorized"));

// Don't throw errors directly in middleware
// throw new Error("Unauthorized"); // ❌ Wrong
```

### **3. Async Middleware**
```javascript
// For async operations, wrap in try-catch
const asyncMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    req.userDetails = user;
    next();
  } catch (error) {
    next(error); // Pass error to error handler
  }
};
```

## 🔍 Debugging Middlewares

### **1. Logging Middleware**
```javascript
const debugMiddleware = (req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);
  console.log('Request Cookies:', req.cookies);
  next();
};

// Use only in development
if (process.env.NODE_ENV === 'development') {
  app.use(debugMiddleware);
}
```

### **2. Response Time Middleware**
```javascript
const responseTime = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });
  
  next();
};
```

## 🎯 Interview Questions & Answers

### **Q: What is middleware and how does it work?**
**A:** "Middleware are functions that execute during the request-response cycle. They have access to request object (req), response object (res), and next function. They can:
- Execute code
- Modify req/res objects  
- End request-response cycle
- Call next middleware in stack
In my project, I use middleware for authentication, body parsing, error handling, and serving static files."

### **Q: Explain the middleware execution order in your app**
**A:** "Middleware executes in the order they're defined:
1. express.json() - parses JSON bodies
2. cookieParser() - parses cookies
3. Route-specific middleware (like verifyToken)
4. Route handlers
5. Error handling middleware (must be last)
The order is crucial - error handler must be last to catch all errors."

### **Q: How does your authentication middleware work?**
**A:** "My verifyToken middleware:
1. Extracts JWT token from HTTP-only cookies
2. Verifies token using JWT secret
3. If valid: adds user info to req.user and calls next()
4. If invalid: passes error to error handler
This runs before protected route handlers, ensuring only authenticated users can access them."

### **Q: Why do you use HTTP-only cookies for tokens?**
**A:** "HTTP-only cookies prevent XSS attacks because JavaScript cannot access them. The browser automatically sends them with requests, and I can set security flags like secure (HTTPS only) and sameSite (CSRF protection)."

### **Q: How do you handle errors in middleware?**
**A:** "I use a centralized error handling approach:
1. Custom errorHandler function creates error objects with statusCode and message
2. Controllers call next(error) to pass errors to error middleware
3. Global error middleware catches all errors and sends consistent JSON responses
This prevents app crashes and provides uniform error responses."

### **Q: What's the difference between app.use() and router.use()?**
**A:** 
- **app.use()**: Application-level middleware, runs for all routes
- **router.use()**: Router-level middleware, runs only for routes in that router
- **Example**: app.use(express.json()) runs for all requests, but router.post('/create', verifyToken, handler) runs only for that specific route."

### **Q: How would you add rate limiting to your API?**
**A:** "I would use express-rate-limit middleware:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests'
});
app.use('/api/', limiter);
```
This prevents API abuse and DDoS attacks."

### **Q: How do you test middleware?**
**A:** "I would test middleware by:
1. Unit testing individual middleware functions
2. Mocking req, res, next objects
3. Testing different scenarios (valid/invalid tokens, missing headers)
4. Integration testing with actual HTTP requests
5. Using tools like Jest and Supertest"

## 🚀 Advanced Middleware Concepts

### **1. Conditional Middleware**
```javascript
const conditionalAuth = (req, res, next) => {
  // Skip auth for public endpoints
  if (req.path === '/api/listing/get') {
    return next();
  }
  
  // Apply auth for other endpoints
  return verifyToken(req, res, next);
};
```

### **2. Middleware Composition**
```javascript
const authAndOwnership = [
  verifyToken,
  checkOwnership,
  validateInput
];

router.delete('/delete/:id', authAndOwnership, deleteListing);
```

### **3. Error Recovery Middleware**
```javascript
const errorRecovery = (err, req, res, next) => {
  // Log error for monitoring
  console.error('Error:', err);
  
  // Try to recover or provide fallback
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ 
      message: 'Service temporarily unavailable' 
    });
  }
  
  next(err); // Pass to main error handler
};
```

---

**🎯 Key Takeaway:** Middleware tumhare application ka backbone hai. Proper order, error handling, aur security considerations ke saath implement kiya hai. Production-ready middleware architecture hai jo scalable aur maintainable hai!