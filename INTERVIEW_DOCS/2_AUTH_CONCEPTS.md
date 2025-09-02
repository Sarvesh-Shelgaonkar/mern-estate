# 🔐 Authentication & Authorization - MERN Estate

## 📋 Authentication Overview

**Authentication** = "Who are you?" (Identity verification)
**Authorization** = "What can you do?" (Permission checking)

## 🎯 Authentication Flow in Your Project

### **1. Complete User Journey**
```
User Registration → Password Hashing → JWT Token → Cookie Storage → Protected Routes
```

### **2. Technologies Used**
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token creation/verification
- **Firebase Auth** - Google OAuth
- **HTTP-only Cookies** - Secure token storage
- **Redux** - Client-side state management

## 🔒 Password Security Implementation

### **1. Password Hashing with bcryptjs**
```javascript
// api/controllers/auth.controller.js
import bcryptjs from "bcryptjs";

// Registration - Hash password before saving
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Salt rounds = 10 (2^10 = 1024 iterations)
  const hashedPassword = bcryptjs.hashSync(password, 10);
  
  const newUser = new User({ 
    username, 
    email, 
    password: hashedPassword 
  });
  
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    next(error);
  }
};

// Login - Compare hashed passwords
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    
    // Compare plain password with hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    
    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    // Remove password from response
    const { password: pass, ...rest } = validUser._doc;
    
    // Set HTTP-only cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
```

### **🎯 Why bcryptjs?**
- **Salt**: Random data added to password before hashing
- **Adaptive**: Can increase rounds as computers get faster
- **One-way**: Cannot reverse hash to get original password
- **Time-constant**: Prevents timing attacks

## 🎫 JWT (JSON Web Token) Implementation

### **1. JWT Structure**
```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjhhMWIyYzNkNGU1ZjZnN2g4aTlqMCIsImlhdCI6MTY5NDAwMDAwMH0.signature
```

### **2. Token Creation**
```javascript
// Create JWT token
const token = jwt.sign(
  { id: validUser._id },           // Payload
  process.env.JWT_SECRET,          // Secret key
  { expiresIn: '7d' }             // Optional: expiration
);
```

### **3. Token Verification Middleware**
```javascript
// api/utils/verifyUser.js
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Get token from HTTP-only cookie
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    // Add user info to request object
    req.user = user;
    next();
  });
};
```

### **🎯 Why JWT over Sessions?**
- **Stateless**: No server-side storage needed
- **Scalable**: Works across multiple servers
- **Mobile-friendly**: Perfect for mobile apps
- **Cross-domain**: Works across different domains
- **Self-contained**: Contains user information

## 🍪 Cookie-based Token Storage

### **1. HTTP-only Cookies**
```javascript
// Set secure cookie
res.cookie("access_token", token, {
  httpOnly: true,        // Prevents XSS attacks
  secure: true,          // HTTPS only (production)
  sameSite: 'strict',    // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### **2. Cookie vs localStorage**
```javascript
// ❌ localStorage (vulnerable to XSS)
localStorage.setItem('token', token);

// ✅ HTTP-only cookies (secure)
res.cookie("access_token", token, { httpOnly: true });
```

### **🎯 Why HTTP-only Cookies?**
- **XSS Protection**: JavaScript cannot access the cookie
- **Automatic**: Browser sends cookie with every request
- **Secure**: Can set secure flags
- **CSRF Protection**: SameSite attribute

## 🔐 Google OAuth Integration

### **1. Firebase Setup**
```javascript
// client/src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3321c.firebaseapp.com",
  projectId: "mern-estate-3321c",
  storageBucket: "mern-estate-3321c.firebasestorage.app",
  messagingSenderId: "52418480685",
  appId: "1:52418480685:web:b7f76b9802b956085746a4"
};

export const app = initializeApp(firebaseConfig);
```

### **2. OAuth Component**
```javascript
// client/src/components/OAuth.jsx
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Firebase popup authentication
      const result = await signInWithPopup(auth, provider);
      
      // Send user data to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <button onClick={handleGoogleClick} type="button">
      <FaGoogle className="w-5 h-5 text-red-500" />
      Continue with Google
    </button>
  );
}
```

### **3. Backend OAuth Handler**
```javascript
// api/controllers/auth.controller.js
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      // Existing user - sign in
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // New user - create account
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
```

## 🛡️ Authorization Implementation

### **1. Protected Routes**
```javascript
// api/routes/listing.route.js
import { verifyToken } from '../utils/verifyUser.js';

// Only authenticated users can perform these actions
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);

// Public routes (no authentication needed)
router.get('/get/:id', getListing);
router.get('/get', getListings);
```

### **2. Resource Ownership Check**
```javascript
// api/controllers/listing.controller.js
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  
  // Check if user owns this listing
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, "You are not authorized to delete this listing")
    );
  }
  
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};
```

## 🔄 Frontend State Management

### **1. Redux User Slice**
```javascript
// client/src/redux/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart, signInSuccess, signInFailure,
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutUserStart, signOutUserSuccess, signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
```

### **2. Redux Persist Configuration**
```javascript
// client/src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For redux-persist
    }),
});

export const persistor = persistStore(store);
```

### **3. Private Route Component**
```javascript
// client/src/components/PrivateRouter.jsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouter() {
  const { currentUser } = useSelector((state) => state.user);
  
  // If user is authenticated, render child routes
  // Otherwise, redirect to sign-in page
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
```

## 🔐 Security Best Practices Implemented

### **1. Password Security**
```javascript
// Strong password hashing
const hashedPassword = bcryptjs.hashSync(password, 10);

// Password not returned in API responses
const { password: pass, ...rest } = validUser._doc;
res.status(200).json(rest);
```

### **2. JWT Security**
```javascript
// Environment variable for secret
const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

// HTTP-only cookies
res.cookie("access_token", token, { httpOnly: true });
```

### **3. Input Validation**
```javascript
// Mongoose schema validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});
```

### **4. Error Handling**
```javascript
// Custom error handler
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
```

## 🎯 Interview Questions & Answers

### **Q: Explain the difference between authentication and authorization**
**A:** 
- **Authentication**: "Who are you?" - Verifying user identity (login process)
- **Authorization**: "What can you do?" - Checking user permissions (access control)
- **Example**: Login with email/password is authentication. Checking if user can delete their own listing is authorization.

### **Q: Why did you choose JWT over sessions?**
**A:**
- **Stateless**: No server-side storage needed, easier to scale
- **Cross-domain**: Works across different domains/subdomains  
- **Mobile-friendly**: Perfect for mobile apps and SPAs
- **Self-contained**: Contains user info, reduces database queries
- **Microservices**: Easy to share across different services

### **Q: How do you prevent XSS attacks?**
**A:**
- **HTTP-only cookies**: JavaScript cannot access the token
- **Input sanitization**: Validate and sanitize user inputs
- **Content Security Policy**: Restrict script execution
- **Escape output**: Properly escape data before rendering

### **Q: How do you handle token expiration?**
**A:** "Currently using long-lived tokens. For production, I would implement:
- **Refresh tokens**: Short-lived access tokens + long-lived refresh tokens
- **Automatic refresh**: Intercept 401 responses and refresh token
- **Logout on expiry**: Clear state when refresh fails"

### **Q: Why bcryptjs over other hashing algorithms?**
**A:**
- **Adaptive**: Can increase difficulty as computers get faster
- **Salt included**: Each hash has unique salt
- **Time-tested**: Industry standard for password hashing
- **Slow by design**: Prevents brute force attacks

### **Q: How do you handle OAuth security?**
**A:**
- **Firebase handles OAuth flow**: Secure, Google-managed
- **State parameter**: Prevents CSRF attacks (Firebase handles this)
- **Token validation**: Verify tokens on backend
- **User data validation**: Validate data received from OAuth provider

## 🚀 Advanced Security Enhancements (Future)

### **1. Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

app.use('/api/auth/signin', authLimiter);
```

### **2. Account Lockout**
```javascript
// Track failed login attempts
const userSchema = new mongoose.Schema({
  // ... other fields
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
});
```

### **3. Two-Factor Authentication**
```javascript
// Using speakeasy for TOTP
const speakeasy = require('speakeasy');
const secret = speakeasy.generateSecret({
  name: 'MERN Estate',
  length: 20
});
```

### **4. Password Strength Validation**
```javascript
// Frontend validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

---

**🎯 Key Takeaway:** Tumhara authentication system production-ready hai with proper password hashing, JWT tokens, OAuth integration, and security best practices. Multiple layers of security implement kiye hain!