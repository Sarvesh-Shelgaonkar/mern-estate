# 🚀 Additional Advanced Concepts - MERN Estate

## 📋 Advanced Topics Overview

**Beyond the Basics** = Advanced concepts that make your project stand out in interviews and demonstrate deep technical knowledge.

## 🔥 React Advanced Concepts

### **1. Custom Hooks Implementation**
```javascript
// client/src/hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage in components
const ListingPage = ({ id }) => {
  const { data: listing, loading, error } = useApi(`/api/listing/get/${id}`);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ListingDetails listing={listing} />;
};
```

### **2. Performance Optimization Techniques**
```javascript
// React.memo for component optimization
const ListingItem = React.memo(({ listing, onFavorite }) => {
  return (
    <div className="listing-card">
      <img src={listing.imageUrls[0]} alt={listing.name} />
      <h3>{listing.name}</h3>
      <p>${listing.regularPrice}</p>
      <button onClick={() => onFavorite(listing._id)}>
        Add to Favorites
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.listing._id === nextProps.listing._id &&
         prevProps.listing.regularPrice === nextProps.listing.regularPrice;
});

// useMemo for expensive calculations
const SearchResults = ({ listings, filters }) => {
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      if (filters.minPrice && listing.regularPrice < filters.minPrice) return false;
      if (filters.maxPrice && listing.regularPrice > filters.maxPrice) return false;
      if (filters.type && listing.type !== filters.type) return false;
      return true;
    });
  }, [listings, filters]);

  const averagePrice = useMemo(() => {
    if (filteredListings.length === 0) return 0;
    const total = filteredListings.reduce((sum, listing) => sum + listing.regularPrice, 0);
    return total / filteredListings.length;
  }, [filteredListings]);

  return (
    <div>
      <p>Average Price: ${averagePrice.toLocaleString()}</p>
      {filteredListings.map(listing => (
        <ListingItem key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

// useCallback for function optimization
const SearchPage = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleFavorite = useCallback((listingId) => {
    // Add to favorites logic
    console.log('Adding to favorites:', listingId);
  }, []);

  return (
    <div>
      <FilterPanel onFilterChange={handleFilterChange} />
      <SearchResults 
        listings={listings} 
        filters={filters}
        onFavorite={handleFavorite}
      />
    </div>
  );
};
```

### **3. Error Boundaries**
```javascript
// client/src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App.jsx
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Other routes */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

## 🔧 Advanced Backend Concepts

### **1. Database Optimization**
```javascript
// Advanced MongoDB aggregation pipeline
export const getListingAnalytics = async (req, res, next) => {
  try {
    const analytics = await Listing.aggregate([
      // Stage 1: Match active listings
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        }
      },
      
      // Stage 2: Group by type and calculate metrics
      {
        $group: {
          _id: '$type',
          totalListings: { $sum: 1 },
          averagePrice: { $avg: '$regularPrice' },
          minPrice: { $min: '$regularPrice' },
          maxPrice: { $max: '$regularPrice' },
          totalValue: { $sum: '$regularPrice' },
          averageBedrooms: { $avg: '$bedrooms' },
          averageBathrooms: { $avg: '$bathrooms' },
          furnishedCount: {
            $sum: { $cond: [{ $eq: ['$furnished', true] }, 1, 0] }
          },
          parkingCount: {
            $sum: { $cond: [{ $eq: ['$parking', true] }, 1, 0] }
          },
          offerCount: {
            $sum: { $cond: [{ $eq: ['$offer', true] }, 1, 0] }
          }
        }
      },
      
      // Stage 3: Add calculated fields
      {
        $addFields: {
          furnishedPercentage: {
            $multiply: [{ $divide: ['$furnishedCount', '$totalListings'] }, 100]
          },
          parkingPercentage: {
            $multiply: [{ $divide: ['$parkingCount', '$totalListings'] }, 100]
          },
          offerPercentage: {
            $multiply: [{ $divide: ['$offerCount', '$totalListings'] }, 100]
          }
        }
      },
      
      // Stage 4: Sort by total listings
      { $sort: { totalListings: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// Database indexing strategy
const createIndexes = async () => {
  // Compound index for common queries
  await Listing.collection.createIndex({ 
    type: 1, 
    offer: 1, 
    regularPrice: 1 
  });

  // Text index for search functionality
  await Listing.collection.createIndex({
    name: 'text',
    description: 'text',
    address: 'text'
  }, {
    weights: {
      name: 10,
      description: 5,
      address: 3
    }
  });

  // Geospatial index for location-based queries
  await Listing.collection.createIndex({ location: '2dsphere' });

  // TTL index for temporary data (if needed)
  await Listing.collection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 365 * 24 * 60 * 60 } // 1 year
  );
};
```

### **2. Advanced Middleware**
```javascript
// Rate limiting middleware
import rateLimit from 'express-rate-limit';

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limits for different endpoints
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many authentication attempts, please try again later'
);

const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  'Too many API requests, please try again later'
);

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`
    );
  });
  
  next();
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  next();
};

// Apply middleware
app.use(requestLogger);
app.use(securityHeaders);
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);
```

### **3. Advanced Error Handling**
```javascript
// Custom error classes
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Not authorized') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational errors: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  } else {
    // Programming errors: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  }
};
```

## 🔒 Advanced Security Concepts

### **1. Input Sanitization & Validation**
```javascript
import validator from 'validator';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss';

// Data sanitization middleware
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use((req, res, next) => {
  // XSS protection
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
  }
  next();
});

// Advanced validation
const validateListing = (req, res, next) => {
  const { name, description, address, regularPrice, discountPrice, email } = req.body;
  const errors = [];

  // Name validation
  if (!name || !validator.isLength(name, { min: 3, max: 100 })) {
    errors.push('Name must be between 3 and 100 characters');
  }
  if (name && !validator.matches(name, /^[a-zA-Z0-9\s\-_.,]+$/)) {
    errors.push('Name contains invalid characters');
  }

  // Email validation (if provided)
  if (email && !validator.isEmail(email)) {
    errors.push('Invalid email format');
  }

  // Price validation
  if (!regularPrice || !validator.isNumeric(regularPrice.toString()) || regularPrice < 0) {
    errors.push('Regular price must be a positive number');
  }

  if (!discountPrice || !validator.isNumeric(discountPrice.toString()) || discountPrice < 0) {
    errors.push('Discount price must be a positive number');
  }

  if (regularPrice && discountPrice && discountPrice >= regularPrice) {
    errors.push('Discount price must be less than regular price');
  }

  // Address validation
  if (!address || !validator.isLength(address, { min: 10, max: 200 })) {
    errors.push('Address must be between 10 and 200 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
```

### **2. Advanced Authentication**
```javascript
// JWT with refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Token refresh endpoint
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new AuthenticationError('Refresh token not provided'));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AuthenticationError('User not found'));
    }

    const tokens = generateTokens(user._id);

    res
      .cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000 // 15 minutes
      })
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: 'Token refreshed successfully'
      });
  } catch (error) {
    next(new AuthenticationError('Invalid refresh token'));
  }
};

// Password strength validation
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## 📊 Advanced Testing Concepts

### **1. Unit Testing**
```javascript
// tests/controllers/auth.test.js
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import User from '../models/user.model.js';

describe('Auth Controller', () => {
  beforeEach(async () => {
    // Clean database before each test
    await User.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User created successfully');

      // Verify user was created in database
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
      expect(user.username).toBe(userData.username);
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      // Create first user
      await request(app)
        .post('/api/auth/signup')
        .send(userData);

      // Try to create duplicate
      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });
});
```

### **2. Integration Testing**
```javascript
// tests/integration/listing.test.js
describe('Listing Integration Tests', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    // Create and authenticate user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: bcryptjs.hashSync('password123', 10)
    });

    userId = user._id;
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  it('should create, read, update, and delete a listing', async () => {
    const listingData = {
      name: 'Test Property',
      description: 'A beautiful test property',
      address: '123 Test Street',
      regularPrice: 500000,
      discountPrice: 450000,
      bedrooms: 3,
      bathrooms: 2,
      furnished: true,
      parking: true,
      type: 'sell',
      offer: true,
      imageUrls: ['https://example.com/image1.jpg']
    };

    // CREATE
    const createResponse = await request(app)
      .post('/api/listing/create')
      .set('Cookie', `access_token=${authToken}`)
      .send(listingData)
      .expect(201);

    const listingId = createResponse.body.data._id;

    // READ
    const readResponse = await request(app)
      .get(`/api/listing/get/${listingId}`)
      .expect(200);

    expect(readResponse.body.data.name).toBe(listingData.name);

    // UPDATE
    const updateData = { name: 'Updated Property Name' };
    const updateResponse = await request(app)
      .post(`/api/listing/update/${listingId}`)
      .set('Cookie', `access_token=${authToken}`)
      .send(updateData)
      .expect(200);

    expect(updateResponse.body.data.name).toBe(updateData.name);

    // DELETE
    await request(app)
      .delete(`/api/listing/delete/${listingId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200);

    // Verify deletion
    await request(app)
      .get(`/api/listing/get/${listingId}`)
      .expect(404);
  });
});
```

## 🎯 Interview Questions & Answers

### **Q: How do you optimize React performance?**
**A:** "Multiple optimization techniques:
1. **React.memo**: Prevent unnecessary re-renders
2. **useMemo**: Cache expensive calculations
3. **useCallback**: Prevent function recreation
4. **Code Splitting**: React.lazy() for route-based splitting
5. **Virtual Scrolling**: For large lists
6. **Bundle Analysis**: Identify and remove unused code"

### **Q: How do you handle database performance?**
**A:** "Database optimization strategies:
1. **Indexing**: Strategic index creation for frequent queries
2. **Aggregation**: MongoDB pipelines for complex operations
3. **Connection Pooling**: Reuse database connections
4. **Query Optimization**: Analyze and optimize slow queries
5. **Pagination**: Limit data transfer with skip/limit
6. **Caching**: Redis for frequently accessed data"

### **Q: What security measures beyond authentication?**
**A:** "Comprehensive security approach:
1. **Input Validation**: Server-side validation and sanitization
2. **SQL Injection**: Parameterized queries and ORM protection
3. **XSS Protection**: Content Security Policy and input escaping
4. **Rate Limiting**: Prevent abuse and DDoS attacks
5. **Security Headers**: HTTPS, HSTS, X-Frame-Options
6. **Error Handling**: Don't leak sensitive information"

### **Q: How do you test your application?**
**A:** "Multi-level testing strategy:
1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints and database operations
3. **E2E Tests**: Complete user workflows
4. **Performance Tests**: Load testing and benchmarking
5. **Security Tests**: Vulnerability scanning
6. **Automated Testing**: CI/CD pipeline integration"

---

**🎯 Key Takeaway:** Ye advanced concepts tumhare project ko production-level banate hain aur interviews mein tumhe senior developer ki tarah present karte hain!