# 🍃 MongoDB & Express.js Integration - MERN Estate

## 📋 MongoDB Overview

**MongoDB** = NoSQL document database that stores data in JSON-like documents (BSON)

## 🎯 Why MongoDB for Real Estate App?

### **1. Flexible Schema**
```javascript
// Property data varies significantly
{
  name: "Luxury Villa",
  bedrooms: 4,
  pool: true,        // Some properties have pools
  garden: "large"    // Some have gardens
}

{
  name: "Studio Apartment", 
  bedrooms: 1,
  parking: false,    // Different amenities
  furnished: true
}
```

### **2. JSON-like Structure**
```javascript
// Frontend JavaScript object
const propertyData = {
  name: "Beautiful Villa",
  price: 5000000,
  amenities: ["pool", "garden", "parking"]
};

// MongoDB document (same structure)
{
  "_id": ObjectId("..."),
  "name": "Beautiful Villa", 
  "price": 5000000,
  "amenities": ["pool", "garden", "parking"],
  "createdAt": ISODate("...")
}
```

## 🏗️ Database Schema Design

### **1. User Schema**
```javascript
// api/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: "https://files.oaiusercontent.com/file-AYszGRse4bWggsZbBEp6vB?se=2025-01-12T05%3A56%3A53Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D521a7440-96b1-4813-ae25-283386fb4fc6.webp&sig=EuCInCQfCVe3O9grTixU6riWm0u2UavJjRq/cYkGFc8%3D"
  }
}, { 
  timestamps: true  // Automatically adds createdAt and updatedAt
});

const User = mongoose.model("User", userSchema);
export default User;
```

### **2. Listing Schema**
```javascript
// api/models/listing.model.js
import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Property name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  address: {
    type: String,
    required: [true, 'Property address is required'],
    trim: true
  },
  regularPrice: {
    type: Number,
    required: [true, 'Regular price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    required: [true, 'Discount price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value) {
        return value <= this.regularPrice;
      },
      message: 'Discount price must be less than regular price'
    }
  },
  bathrooms: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 bathroom'],
    max: [20, 'Cannot have more than 20 bathrooms']
  },
  bedrooms: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 bedroom'],
    max: [20, 'Cannot have more than 20 bedrooms']
  },
  furnished: {
    type: Boolean,
    required: true,
    default: false
  },
  parking: {
    type: Boolean,
    required: true,
    default: false
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ['rent', 'sell'],
      message: 'Type must be either rent or sell'
    }
  },
  offer: {
    type: Boolean,
    required: true,
    default: false
  },
  imageUrls: {
    type: [String],
    required: [true, 'At least one image is required'],
    validate: {
      validator: function(array) {
        return array.length > 0 && array.length <= 10;
      },
      message: 'Must have between 1 and 10 images'
    }
  },
  userRef: {
    type: String,
    required: [true, 'User reference is required']
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
listingSchema.index({ name: 'text', description: 'text' }); // Text search
listingSchema.index({ type: 1, offer: 1 }); // Filter queries
listingSchema.index({ regularPrice: 1 }); // Price sorting
listingSchema.index({ createdAt: -1 }); // Latest first
listingSchema.index({ userRef: 1 }); // User's listings

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
```

## 🔗 MongoDB Connection Setup

### **1. Database Connection**
```javascript
// api/index.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection with error handling
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Maximum number of connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferMaxEntries: 0 // Disable mongoose buffering
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Database Name:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  });

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});
```

### **2. Environment Configuration**
```javascript
// .env file
MONGO=mongodb+srv://username:password@cluster.mongodb.net/mern-estate?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_123456789
NODE_ENV=development
PORT=3000
```

## 🚀 Express.js Framework

### **1. Express Server Setup**
```javascript
// api/index.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (limit for image uploads)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// CORS headers (for development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files in production
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all handler for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Log error for debugging
  console.error(`Error ${statusCode}: ${message}`);
  
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
```

## 🎯 CRUD Operations Implementation

### **1. Create Operation**
```javascript
// api/controllers/listing.controller.js
export const createListing = async (req, res, next) => {
  try {
    // Validate required fields
    const {
      name, description, address, regularPrice, discountPrice,
      bathrooms, bedrooms, furnished, parking, type, offer, imageUrls
    } = req.body;

    // Add user reference from JWT token
    const listingData = {
      ...req.body,
      userRef: req.user.id // From verifyToken middleware
    };

    // Create new listing
    const listing = await Listing.create(listingData);
    
    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return next(errorHandler(400, messages.join(', ')));
    }
    next(error);
  }
};
```

### **2. Read Operations**
```javascript
// Get single listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    
    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return next(errorHandler(400, "Invalid listing ID"));
    }
    next(error);
  }
};

// Get multiple listings with advanced filtering
export const getListings = async (req, res, next) => {
  try {
    // Pagination
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    // Build filter object
    const filter = {};
    
    // Offer filter
    if (req.query.offer && req.query.offer !== 'false') {
      filter.offer = req.query.offer === 'true';
    }
    
    // Furnished filter
    if (req.query.furnished && req.query.furnished !== 'false') {
      filter.furnished = req.query.furnished === 'true';
    }
    
    // Parking filter
    if (req.query.parking && req.query.parking !== 'false') {
      filter.parking = req.query.parking === 'true';
    }
    
    // Type filter
    if (req.query.type && req.query.type !== 'all') {
      filter.type = req.query.type;
    }
    
    // Search term (text search)
    if (req.query.searchTerm) {
      filter.$or = [
        { name: { $regex: req.query.searchTerm, $options: 'i' } },
        { description: { $regex: req.query.searchTerm, $options: 'i' } },
        { address: { $regex: req.query.searchTerm, $options: 'i' } }
      ];
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.regularPrice = {};
      if (req.query.minPrice) filter.regularPrice.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filter.regularPrice.$lte = parseInt(req.query.maxPrice);
    }
    
    // Sorting
    const sort = {};
    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    sort[sortField] = sortOrder;
    
    // Execute query
    const listings = await Listing.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(startIndex)
      .select('-__v'); // Exclude version field
    
    // Get total count for pagination
    const totalCount = await Listing.countDocuments(filter);
    
    return res.status(200).json({
      success: true,
      data: listings,
      pagination: {
        currentPage: Math.floor(startIndex / limit) + 1,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNext: startIndex + limit < totalCount,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### **3. Update Operation**
```javascript
export const updateListing = async (req, res, next) => {
  try {
    // Find listing first
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    
    // Check ownership
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You are not authorized to update this listing"));
    }
    
    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,           // Return updated document
        runValidators: true  // Run schema validations
      }
    );
    
    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return next(errorHandler(400, messages.join(', ')));
    }
    next(error);
  }
};
```

### **4. Delete Operation**
```javascript
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    
    // Check ownership
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You are not authorized to delete this listing"));
    }
    
    // Delete listing
    await Listing.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Listing deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
```

## 🔍 Advanced MongoDB Features

### **1. Aggregation Pipeline**
```javascript
// Get statistics for dashboard
export const getListingStats = async (req, res, next) => {
  try {
    const stats = await Listing.aggregate([
      // Match user's listings
      { $match: { userRef: req.user.id } },
      
      // Group by type and calculate stats
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgPrice: { $avg: '$regularPrice' },
          minPrice: { $min: '$regularPrice' },
          maxPrice: { $max: '$regularPrice' },
          totalValue: { $sum: '$regularPrice' }
        }
      },
      
      // Sort by count
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
```

### **2. Text Search**
```javascript
// Full-text search across multiple fields
export const searchListings = async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    
    const listings = await Listing.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } } // Include relevance score
    )
    .sort({ score: { $meta: 'textScore' } }) // Sort by relevance
    .limit(20);
    
    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (error) {
    next(error);
  }
};
```

### **3. Geospatial Queries (Future Enhancement)**
```javascript
// Add location field to schema
const listingSchema = new mongoose.Schema({
  // ... other fields
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  }
});

// Find listings near a location
export const getNearbyListings = async (req, res, next) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query;
    
    const listings = await Listing.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance) // meters
        }
      }
    });
    
    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (error) {
    next(error);
  }
};
```

## 🛡️ Security & Performance

### **1. Input Validation**
```javascript
// Using Mongoose built-in validation
const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Name too long'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s]+$/.test(v); // Alphanumeric and spaces only
      },
      message: 'Name contains invalid characters'
    }
  }
});
```

### **2. Database Indexing**
```javascript
// Create indexes for better performance
listingSchema.index({ name: 'text', description: 'text' }); // Text search
listingSchema.index({ type: 1, offer: 1 }); // Compound index for filters
listingSchema.index({ regularPrice: 1 }); // Price sorting
listingSchema.index({ createdAt: -1 }); // Latest first
listingSchema.index({ userRef: 1 }); // User's listings
listingSchema.index({ 'location': '2dsphere' }); // Geospatial queries
```

### **3. Connection Pooling**
```javascript
// MongoDB connection with optimized settings
mongoose.connect(process.env.MONGO, {
  maxPoolSize: 10,        // Maximum number of connections
  minPoolSize: 2,         // Minimum number of connections
  maxIdleTimeMS: 30000,   // Close connections after 30 seconds of inactivity
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
});
```

## 🎯 Interview Questions & Answers

### **Q: Why did you choose MongoDB over SQL databases?**
**A:** "I chose MongoDB because:
- **Flexible Schema**: Real estate properties have varying attributes (some have pools, gardens, etc.)
- **JSON-like Documents**: Perfect match for JavaScript objects in React/Node.js
- **Horizontal Scaling**: Easy to scale as property listings grow
- **Rich Queries**: Support for complex filtering and text search
- **No Complex Joins**: Property data is mostly self-contained"

### **Q: Explain your database schema design**
**A:** "I designed two main collections:
- **Users**: Stores authentication data with unique constraints on email/username
- **Listings**: Stores property data with reference to user who created it
- **Relationship**: One-to-Many (one user can have multiple listings)
- **Indexes**: Created on frequently queried fields like type, price, and text search"

### **Q: How do you handle database validation?**
**A:** "Multiple layers of validation:
- **Mongoose Schema**: Built-in validation for required fields, data types, ranges
- **Custom Validators**: Business logic validation (discount price < regular price)
- **Frontend Validation**: User experience and immediate feedback
- **Sanitization**: Trim whitespace, convert to lowercase for emails"

### **Q: How do you optimize database queries?**
**A:** "Several optimization techniques:
- **Indexing**: Created indexes on frequently queried fields
- **Pagination**: Limit results with skip() and limit()
- **Projection**: Select only needed fields with select()
- **Aggregation**: Use aggregation pipeline for complex queries
- **Connection Pooling**: Reuse database connections"

### **Q: How do you handle database errors?**
**A:** "Comprehensive error handling:
- **Validation Errors**: Custom messages for user-friendly feedback
- **Cast Errors**: Handle invalid ObjectId formats
- **Duplicate Key Errors**: Handle unique constraint violations
- **Connection Errors**: Graceful degradation and retry logic
- **Logging**: Log errors for debugging and monitoring"

### **Q: Explain your Express.js routing structure**
**A:** "Modular routing approach:
- **Route Files**: Separate files for auth, user, and listing routes
- **Middleware**: Authentication middleware for protected routes
- **Controllers**: Business logic separated from routes
- **Error Handling**: Centralized error handling middleware
- **Validation**: Input validation at route level"

### **Q: How would you scale this database?**
**A:** "Scaling strategies:
- **Read Replicas**: For read-heavy workloads
- **Sharding**: Distribute data across multiple servers
- **Caching**: Redis for frequently accessed data
- **CDN**: For image storage and delivery
- **Database Optimization**: Query optimization and indexing"

---

**🎯 Key Takeaway:** MongoDB aur Express.js ka combination tumhare real estate app ke liye perfect hai. Flexible schema, powerful querying, aur scalable architecture ke saath production-ready database layer banaya hai!