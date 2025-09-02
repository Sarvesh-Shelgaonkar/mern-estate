# 🌐 REST API Architecture - MERN Estate

## 📋 REST API Overview

**REST (Representational State Transfer)** - Tumhare project mein RESTful API design pattern use kiya hai.

## 🎯 Why REST API?

### **1. Stateless Communication**
```javascript
// Har request independent hai
GET /api/listings/123
POST /api/auth/signin
DELETE /api/listings/456
```

### **2. HTTP Methods ka Proper Use**
```javascript
// api/routes/listing.route.js
router.post('/create', verifyToken, createListing);     // CREATE
router.get('/get/:id', getListing);                     // READ
router.post('/update/:id', verifyToken, updateListing); // UPDATE  
router.delete('/delete/:id', verifyToken, deleteListing); // DELETE
```

## 🏗️ API Structure in Your Project

### **Authentication Routes**
```javascript
// api/routes/auth.route.js
POST /api/auth/signup    - User registration
POST /api/auth/signin    - User login
POST /api/auth/google    - Google OAuth
GET  /api/auth/signOut   - User logout
```

### **User Routes**
```javascript
// api/routes/user.route.js
GET    /api/user/test           - Test endpoint
POST   /api/user/update/:id     - Update user profile
DELETE /api/user/delete/:id     - Delete user account
GET    /api/user/listings/:id   - Get user's listings
```

### **Listing Routes**
```javascript
// api/routes/listing.route.js
POST   /api/listing/create      - Create new property
GET    /api/listing/get/:id     - Get single property
POST   /api/listing/update/:id  - Update property
DELETE /api/listing/delete/:id  - Delete property
GET    /api/listing/get         - Get all properties (with filters)
```

## 🔥 REST Principles Implementation

### **1. Resource-Based URLs**
```javascript
// ❌ Wrong way
/api/getUserListings
/api/createNewProperty

// ✅ Correct way (Your implementation)
/api/user/listings/:id
/api/listing/create
```

### **2. HTTP Status Codes**
```javascript
// api/controllers/listing.controller.js
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing); // 201 - Created
  } catch (error) {
    next(error); // 500 - Internal Server Error
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found")); // 404 - Not Found
    }
    res.status(200).json(listing); // 200 - OK
  } catch (error) {
    next(error);
  }
};
```

### **3. JSON Data Format**
```javascript
// Request Body
{
  "name": "Beautiful Villa",
  "description": "Luxury 3BHK villa",
  "address": "Mumbai, Maharashtra",
  "regularPrice": 5000000,
  "discountPrice": 4500000,
  "bathrooms": 3,
  "bedrooms": 3,
  "furnished": true,
  "parking": true,
  "type": "sell",
  "offer": true,
  "imageUrls": ["url1", "url2"]
}

// Response
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "Beautiful Villa",
    // ... other fields
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🛡️ API Security Features

### **1. Authentication Middleware**
```javascript
// api/utils/verifyUser.js
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) return next(errorHandler(401, "Unauthorized"));
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user; // User info available in next middleware
    next();
  });
};
```

### **2. Protected Routes**
```javascript
// Only authenticated users can create/update/delete
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);

// Public routes (no authentication needed)
router.get('/get/:id', getListing);
router.get('/get', getListings);
```

## 🔍 Advanced API Features

### **1. Query Parameters for Filtering**
```javascript
// api/controllers/listing.controller.js
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    // Dynamic filtering
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }
    
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    
    // MongoDB query with filters
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      type,
    })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);
    
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
```

### **2. Error Handling Middleware**
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

## 📱 Frontend API Integration

### **1. Fetch API Usage**
```javascript
// client/src/pages/SignIn.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate("/");
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};
```

### **2. Proxy Configuration**
```javascript
// client/vite.config.js
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
```

## 🎯 Interview Questions & Answers

### **Q: What is REST and why did you use it?**
**A:** "REST is an architectural style for web services. I used it because:
- **Stateless**: Each request contains all information needed
- **Cacheable**: Responses can be cached for better performance  
- **Uniform Interface**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Scalable**: Easy to scale horizontally
- **Language Independent**: Frontend and backend can use different technologies"

### **Q: How do you handle API versioning?**
**A:** "Currently using v1 implicitly. For future versions, I would:
- URL versioning: `/api/v1/listings`, `/api/v2/listings`
- Header versioning: `Accept: application/vnd.api+json;version=1`
- Maintain backward compatibility for existing clients"

### **Q: How do you ensure API security?**
**A:** "Multiple layers of security:
- **JWT Authentication**: Stateless token-based auth
- **HTTP-only Cookies**: Prevent XSS attacks
- **Input Validation**: Mongoose schema validation
- **Rate Limiting**: Prevent API abuse (can be added)
- **CORS Configuration**: Control cross-origin requests"

### **Q: How do you handle API errors?**
**A:** "Centralized error handling:
- **Custom Error Handler**: Consistent error format
- **HTTP Status Codes**: Proper status codes for different scenarios
- **Error Messages**: User-friendly messages
- **Logging**: Server-side error logging for debugging"

## 🚀 Performance Optimizations

### **1. Pagination**
```javascript
// Limit results to prevent large data transfer
const limit = parseInt(req.query.limit) || 9;
const startIndex = parseInt(req.query.startIndex) || 0;

const listings = await Listing.find(query)
  .limit(limit)
  .skip(startIndex);
```

### **2. Database Indexing**
```javascript
// Create indexes for better query performance
db.listings.createIndex({ "name": "text" });
db.listings.createIndex({ "type": 1, "offer": 1 });
db.listings.createIndex({ "createdAt": -1 });
```

### **3. Response Compression**
```javascript
// Can be added for production
app.use(compression());
```

## 🔄 API Testing

### **1. Manual Testing with Postman**
```javascript
// Test endpoints
GET http://localhost:3000/api/listing/get
POST http://localhost:3000/api/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### **2. Automated Testing (Future Enhancement)**
```javascript
// Using Jest and Supertest
describe('Listing API', () => {
  test('GET /api/listing/get should return listings', async () => {
    const response = await request(app)
      .get('/api/listing/get')
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

## 📈 Scalability Considerations

### **1. Caching Strategy**
```javascript
// Redis caching for frequently accessed data
const cachedListings = await redis.get('listings:popular');
if (cachedListings) {
  return res.json(JSON.parse(cachedListings));
}
```

### **2. Rate Limiting**
```javascript
// Express rate limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

---

**🎯 Key Takeaway:** Tumhara REST API well-structured hai with proper HTTP methods, status codes, authentication, and error handling. Production-ready features like pagination and filtering bhi implement kiye hain!