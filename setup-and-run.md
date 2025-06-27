# 🚀 MERN Estate - Setup & Run Guide

## Quick Start Commands

### 1. Install All Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### 2. Environment Setup
Create `.env` in root directory:
```env
MONGO=mongodb+srv://username:password@cluster.mongodb.net/mern-estate
JWT_SECRET=your_super_secret_jwt_key_here
```

Create `client/.env.local`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

### 3. Run the Application

#### Option A: Separate Terminals
**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

#### Option B: Single Command (if configured)
```bash
npm run dev
```

### 4. Access Your App
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 🎯 What You'll See

Your enhanced MERN Estate app with:
- ✅ Beautiful glass morphism design
- ✅ Modern authentication pages
- ✅ Stunning property showcases
- ✅ Responsive mobile design
- ✅ Dark/light mode toggle
- ✅ Professional animations
- ✅ Enhanced user experience

## 🔧 Troubleshooting

### Common Issues:

1. **Port Already in Use:**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **MongoDB Connection Issues:**
   - Check your MongoDB connection string
   - Ensure MongoDB is running (if local)
   - Verify network access (if using Atlas)

3. **Firebase Issues:**
   - Verify Firebase API key
   - Check Firebase project configuration

4. **Dependencies Issues:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # For client
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🎉 Enjoy Your Beautiful Real Estate Platform!