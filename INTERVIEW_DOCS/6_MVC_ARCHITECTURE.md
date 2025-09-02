# 🏗️ MVC Architecture Pattern - MERN Estate

## 📋 MVC Overview

**MVC (Model-View-Controller)** = Architectural pattern that separates application logic into three interconnected components.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    MODEL    │    │ CONTROLLER  │    │    VIEW     │
│  (Database) │◄──►│ (Business   │◄──►│ (Frontend)  │
│             │    │  Logic)     │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🎯 MVC in MERN Estate

### **Model Layer (M)**
- **MongoDB Collections** (Users, Listings)
- **Mongoose Schemas** (Data structure & validation)
- **Database Operations** (CRUD operations)

### **View Layer (V)**
- **React Components** (UI presentation)
- **JSX Templates** (User interface)
- **State Management** (Redux for data display)

### **Controller Layer (C)**
- **Express Route Handlers** (Business logic)
- **API Endpoints** (Request processing)
- **Middleware Functions** (Authentication, validation)

## 📊 Model Layer Implementation

### **1. User Model**
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
    default: "https://example.com/default-avatar.jpg"
  }
}, { 
  timestamps: true 
});

// Model methods
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; // Never send password in response
  return user;
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);
export default User;
```

### **2. Listing Model**
```javascript
// api/models/listing.model.js
import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
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
    min: [1, 'Must have at least 1 bathroom']
  },
  bedrooms: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 bedroom']
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

// Indexes for performance
listingSchema.index({ name: 'text', description: 'text' });
listingSchema.index({ type: 1, offer: 1 });
listingSchema.index({ regularPrice: 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ userRef: 1 });

// Instance methods
listingSchema.methods.isOwnedBy = function(userId) {
  return this.userRef === userId;
};

// Static methods
listingSchema.statics.findByUser = function(userId) {
  return this.find({ userRef: userId });
};

listingSchema.statics.findWithFilters = function(filters) {
  const query = {};
  
  if (filters.type && filters.type !== 'all') {
    query.type = filters.type;
  }
  
  if (filters.offer !== undefined) {
    query.offer = filters.offer;
  }
  
  if (filters.furnished !== undefined) {
    query.furnished = filters.furnished;
  }
  
  if (filters.parking !== undefined) {
    query.parking = filters.parking;
  }
  
  if (filters.searchTerm) {
    query.$or = [
      { name: { $regex: filters.searchTerm, $options: 'i' } },
      { description: { $regex: filters.searchTerm, $options: 'i' } },
      { address: { $regex: filters.searchTerm, $options: 'i' } }
    ];
  }
  
  return this.find(query);
};

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
```

## 🎮 Controller Layer Implementation

### **1. Authentication Controller**
```javascript
// api/controllers/auth.controller.js
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

class AuthController {
  // User registration
  static async signup(req, res, next) {
    try {
      const { username, email, password } = req.body;
      
      // Input validation
      if (!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"));
      }
      
      if (password.length < 6) {
        return next(errorHandler(400, "Password must be at least 6 characters"));
      }
      
      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        return next(errorHandler(400, "User already exists"));
      }
      
      // Hash password
      const hashedPassword = bcryptjs.hashSync(password, 10);
      
      // Create new user
      const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword 
      });
      
      await newUser.save();
      
      res.status(201).json({
        success: true,
        message: "User created successfully"
      });
    } catch (error) {
      next(error);
    }
  }
  
  // User login
  static async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Input validation
      if (!email || !password) {
        return next(errorHandler(400, "Email and password are required"));
      }
      
      // Find user
      const validUser = await User.findByEmail(email);
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      
      // Verify password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "Invalid credentials"));
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: validUser._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      // Remove password from response
      const { password: pass, ...rest } = validUser._doc;
      
      // Set HTTP-only cookie
      res
        .cookie("access_token", token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(200)
        .json({
          success: true,
          data: rest
        });
    } catch (error) {
      next(error);
    }
  }
  
  // Google OAuth
  static async google(req, res, next) {
    try {
      const { name, email, photo } = req.body;
      
      let user = await User.findByEmail(email);
      
      if (user) {
        // Existing user - sign in
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({
            success: true,
            data: rest
          });
      } else {
        // New user - create account
        const generatedPassword = Math.random().toString(36).slice(-8) + 
                                 Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        
        const newUser = new User({
          username: name.split(" ").join("").toLowerCase() + 
                   Math.random().toString(36).slice(-4),
          email,
          password: hashedPassword,
          avatar: photo,
        });
        
        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({
            success: true,
            data: rest
          });
      }
    } catch (error) {
      next(error);
    }
  }
  
  // User logout
  static signOut(req, res, next) {
    try {
      res.clearCookie("access_token");
      res.status(200).json({
        success: true,
        message: "User has been logged out"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const { signup, signin, google, signOut } = AuthController;
```

### **2. Listing Controller**
```javascript
// api/controllers/listing.controller.js
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

class ListingController {
  // Create new listing
  static async createListing(req, res, next) {
    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'address', 'regularPrice', 'discountPrice'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return next(errorHandler(400, `${field} is required`));
        }
      }
      
      // Add user reference
      const listingData = {
        ...req.body,
        userRef: req.user.id
      };
      
      // Create listing
      const listing = await Listing.create(listingData);
      
      return res.status(201).json({
        success: true,
        message: "Listing created successfully",
        data: listing
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return next(errorHandler(400, messages.join(', ')));
      }
      next(error);
    }
  }
  
  // Get single listing
  static async getListing(req, res, next) {
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
      if (error.name === 'CastError') {
        return next(errorHandler(400, "Invalid listing ID"));
      }
      next(error);
    }
  }
  
  // Get multiple listings with filters
  static async getListings(req, res, next) {
    try {
      const {
        limit = 9,
        startIndex = 0,
        searchTerm,
        sort = 'createdAt',
        order = 'desc',
        ...filters
      } = req.query;
      
      // Build filter object
      const queryFilters = {};
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== 'false' && filters[key] !== 'all') {
          if (key === 'offer' || key === 'furnished' || key === 'parking') {
            queryFilters[key] = filters[key] === 'true';
          } else {
            queryFilters[key] = filters[key];
          }
        }
      });
      
      // Add search term
      if (searchTerm) {
        queryFilters.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { address: { $regex: searchTerm, $options: 'i' } }
        ];
      }
      
      // Build sort object
      const sortObj = {};
      sortObj[sort] = order === 'asc' ? 1 : -1;
      
      // Execute query
      const listings = await Listing.find(queryFilters)
        .sort(sortObj)
        .limit(parseInt(limit))
        .skip(parseInt(startIndex));
      
      // Get total count for pagination
      const totalCount = await Listing.countDocuments(queryFilters);
      
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
  }
  
  // Update listing
  static async updateListing(req, res, next) {
    try {
      const listing = await Listing.findById(req.params.id);
      
      if (!listing) {
        return next(errorHandler(404, "Listing not found"));
      }
      
      // Check ownership
      if (!listing.isOwnedBy(req.user.id)) {
        return next(errorHandler(401, "You are not authorized to update this listing"));
      }
      
      // Update listing
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
          new: true,
          runValidators: true
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
  }
  
  // Delete listing
  static async deleteListing(req, res, next) {
    try {
      const listing = await Listing.findById(req.params.id);
      
      if (!listing) {
        return next(errorHandler(404, "Listing not found"));
      }
      
      // Check ownership
      if (!listing.isOwnedBy(req.user.id)) {
        return next(errorHandler(401, "You are not authorized to delete this listing"));
      }
      
      await Listing.findByIdAndDelete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: "Listing deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const { 
  createListing, 
  getListing, 
  getListings, 
  updateListing, 
  deleteListing 
} = ListingController;
```