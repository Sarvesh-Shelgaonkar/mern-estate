# 🟢 Node.js Core Concepts - MERN Estate

## 📋 Node.js Overview

**Node.js** = JavaScript runtime built on Chrome's V8 JavaScript engine that allows JavaScript to run on the server-side.

## 🎯 Why Node.js for MERN Estate?

### **1. JavaScript Everywhere**
```javascript
// Same language for frontend and backend
// Frontend (React)
const handleSubmit = async (formData) => {
  const response = await fetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

// Backend (Node.js)
export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  res.json(listing);
};
```

### **2. Non-blocking I/O**
```javascript
// Multiple database operations can run concurrently
const fetchHomeData = async () => {
  // These run in parallel, not sequentially
  const [offerListings, rentListings, saleListings] = await Promise.all([
    Listing.find({ offer: true }).limit(4),
    Listing.find({ type: 'rent' }).limit(4),
    Listing.find({ type: 'sell' }).limit(4)
  ]);
  
  return { offerListings, rentListings, saleListings };
};
```

## 🔧 Node.js Core Features Used

### **1. Event Loop & Asynchronous Programming**
```javascript
// api/index.js - Server setup
import express from "express";
import mongoose from "mongoose";

const app = express();

// Non-blocking database connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
    // Server starts only after DB connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000!");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Non-blocking route handlers
app.get('/api/listings', async (req, res) => {
  try {
    // This doesn't block other requests
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **2. Modules & Package Management**
```javascript
// ES6 Modules (package.json: "type": "module")
import express from "express";           // External module
import mongoose from "mongoose";         // External module
import dotenv from "dotenv";            // External module
import userRouter from "./routes/user.route.js";     // Local module
import authRouter from "./routes/auth.route.js";     // Local module
import { errorHandler } from "./utils/error.js";     // Local utility

// Package.json dependencies
{
  "dependencies": {
    "express": "^4.21.2",      // Web framework
    "mongoose": "^8.9.2",      // MongoDB ODM
    "bcryptjs": "^2.4.3",      // Password hashing
    "jsonwebtoken": "^9.0.2",  // JWT tokens
    "cookie-parser": "^1.4.7", // Cookie parsing
    "dotenv": "^16.4.7",       // Environment variables
    "axios": "^1.11.0"         // HTTP client
  },
  "devDependencies": {
    "nodemon": "^3.1.9"        // Development server
  }
}
```

### **3. File System & Path Operations**
```javascript
// api/index.js - Static file serving
import path from "path";

const __dirname = path.resolve();

// Serve React build files in production
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
```

### **4. Environment Variables**
```javascript
// api/index.js
import dotenv from "dotenv";
dotenv.config();

// Access environment variables
const mongoURI = process.env.MONGO;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;

// .env file
/*
MONGO=mongodb+srv://username:password@cluster.mongodb.net/mern-estate
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_123456789
NODE_ENV=development
PORT=3000
*/
```

## 🚀 Express.js Framework Integration

### **1. Middleware Stack**
```javascript
// api/index.js - Middleware setup
const app = express();

// Built-in middleware
app.use(express.json({ limit: '10mb' }));        // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Third-party middleware
app.use(cookieParser());                         // Parse cookies

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Route middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware (must be last)
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

### **2. Routing System**
```javascript
// api/routes/listing.route.js
import express from 'express';
import { 
  createListing, 
  deleteListing, 
  updateListing, 
  getListing, 
  getListings 
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route definitions with middleware
router.post('/create', verifyToken, createListing);     // Protected
router.delete('/delete/:id', verifyToken, deleteListing); // Protected
router.post('/update/:id', verifyToken, updateListing);   // Protected
router.get('/get/:id', getListing);                       // Public
router.get('/get', getListings);                          // Public

export default router;
```

## 🔄 Asynchronous Programming Patterns

### **1. Promises & Async/Await**
```javascript
// api/controllers/listing.controller.js
export const getListings = async (req, res, next) => {
  try {
    // Sequential operations
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    // Parallel database operations
    const [listings, totalCount] = await Promise.all([
      Listing.find(filter)
        .sort(sort)
        .limit(limit)
        .skip(startIndex),
      Listing.countDocuments(filter)
    ]);
    
    return res.status(200).json({
      success: true,
      data: listings,
      pagination: {
        totalCount,
        currentPage: Math.floor(startIndex / limit) + 1,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};
```

### **2. Error Handling**
```javascript
// api/utils/error.js - Custom error handler
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

// Usage in controllers
export const signin = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    
    // Success response
    res.status(200).json(userData);
  } catch (error) {
    next(error); // Global error handler will catch this
  }
};
```

### **3. Event Emitters (Future Enhancement)**
```javascript
// Real-time notifications using EventEmitter
import { EventEmitter } from 'events';

class ListingEvents extends EventEmitter {}
const listingEvents = new ListingEvents();

// Emit event when new listing is created
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    
    // Emit event for real-time updates
    listingEvents.emit('listingCreated', {
      listing,
      userId: req.user.id
    });
    
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Listen for events
listingEvents.on('listingCreated', (data) => {
  console.log('New listing created:', data.listing.name);
  // Could send notifications, update cache, etc.
});
```

## 🔧 Node.js Built-in Modules Used

### **1. Path Module**
```javascript
import path from "path";

// Get current directory
const __dirname = path.resolve();

// Join paths safely
const staticPath = path.join(__dirname, "/client/dist");
const indexPath = path.join(__dirname, "client", "dist", "index.html");

// Get file extension
const ext = path.extname("image.jpg"); // .jpg
```

### **2. URL Module**
```javascript
// For parsing query parameters
const url = new URL(req.url, `http://${req.headers.host}`);
const searchParams = url.searchParams;

// Example: /api/listings?type=rent&limit=10
const type = searchParams.get('type');     // 'rent'
const limit = searchParams.get('limit');   // '10'
```

### **3. Crypto Module (Future Enhancement)**
```javascript
import crypto from 'crypto';

// Generate secure random tokens
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash passwords (alternative to bcryptjs)
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
};
```

## 🌐 HTTP Server & Request Handling

### **1. HTTP Methods Implementation**
```javascript
// RESTful API endpoints
app.get('/api/listings', getListings);        // READ
app.post('/api/listings', createListing);     // CREATE
app.put('/api/listings/:id', updateListing);  // UPDATE
app.delete('/api/listings/:id', deleteListing); // DELETE

// Request object properties
app.post('/api/listings', (req, res) => {
  console.log('Method:', req.method);          // POST
  console.log('URL:', req.url);               // /api/listings
  console.log('Headers:', req.headers);       // Request headers
  console.log('Body:', req.body);             // Parsed JSON body
  console.log('Query:', req.query);           // Query parameters
  console.log('Params:', req.params);         // Route parameters
  console.log('Cookies:', req.cookies);       // Parsed cookies
});
```

### **2. Response Handling**
```javascript
// Different response types
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      // 404 Not Found
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    // 200 OK with data
    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Set cookies
res.cookie('access_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// Redirect
res.redirect('/login');

// Send files
res.sendFile(path.join(__dirname, 'public', 'index.html'));
```

## 🔄 Process Management

### **1. Process Events**
```javascript
// api/index.js - Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Graceful shutdown...');
  
  // Close database connection
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  
  // Close server
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Close server & exit process
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
```

### **2. Environment Detection**
```javascript
// Different behavior based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

if (isDevelopment) {
  // Enable detailed logging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
  });
}

if (isProduction) {
  // Enable compression, security headers
  app.use(compression());
  app.use(helmet());
}
```

## 🚀 Performance Optimization

### **1. Clustering (Future Enhancement)**
```javascript
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers can share any TCP port
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
```

### **2. Memory Management**
```javascript
// Monitor memory usage
const getMemoryUsage = () => {
  const used = process.memoryUsage();
  return {
    rss: Math.round(used.rss / 1024 / 1024 * 100) / 100,      // MB
    heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
    heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
    external: Math.round(used.external / 1024 / 1024 * 100) / 100
  };
};

// Log memory usage periodically
setInterval(() => {
  console.log('Memory usage:', getMemoryUsage());
}, 30000); // Every 30 seconds
```

## 🎯 Interview Questions & Answers

### **Q: What is Node.js and why did you choose it?**
**A:** "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server. I chose it because:
- **Same Language**: JavaScript everywhere (frontend & backend)
- **Non-blocking I/O**: Perfect for I/O-intensive applications like real estate platforms
- **Large Ecosystem**: NPM has packages for everything I need
- **JSON Native**: Works seamlessly with MongoDB and React
- **Fast Development**: Rapid prototyping and development"

### **Q: Explain the Event Loop in Node.js**
**A:** "The Event Loop is what makes Node.js non-blocking:
1. **Call Stack**: Executes synchronous code
2. **Web APIs**: Handle async operations (timers, I/O)
3. **Callback Queue**: Stores completed async callbacks
4. **Event Loop**: Moves callbacks from queue to stack when stack is empty
This allows Node.js to handle thousands of concurrent connections without blocking."

### **Q: How do you handle errors in Node.js?**
**A:** "Multiple error handling strategies:
- **Try-Catch**: For async/await operations
- **Error-first Callbacks**: Traditional Node.js pattern
- **Promise Rejection**: .catch() for promises
- **Global Handlers**: process.on('unhandledRejection')
- **Express Error Middleware**: Centralized error handling
- **Custom Error Classes**: Structured error responses"

### **Q: What's the difference between require() and import?**
**A:** "Two module systems:
- **require()**: CommonJS, synchronous loading, dynamic imports
- **import**: ES6 modules, static analysis, tree shaking
I use ES6 imports because they're the modern standard, support tree shaking, and work consistently with frontend code."

### **Q: How do you manage dependencies in Node.js?**
**A:** "Using NPM with package.json:
- **dependencies**: Production packages (express, mongoose)
- **devDependencies**: Development tools (nodemon)
- **package-lock.json**: Locks exact versions
- **npm audit**: Security vulnerability checking
- **Semantic Versioning**: ^1.2.3 for compatible updates"

---

**🎯 Key Takeaway:** Node.js tumhare MERN Estate project ka backbone hai jo JavaScript ecosystem ko unite karta hai aur scalable, performant backend provide karta hai!