# 🔧 MERN Estate - Troubleshooting Guide

## 🚨 "Property Not Found" Error - Complete Fix

### **Root Cause:**
The "Property Not Found" error occurs because:
1. **No properties in database** - Database is empty
2. **Backend server not running** - API endpoints not accessible
3. **MongoDB connection issues** - Database not connected
4. **Environment variables missing** - Configuration problems

---

## 🚀 **COMPLETE SOLUTION - Step by Step**

### **Step 1: Check Project Structure**
Make sure you have these files:
```
mern-estate/
├── api/
│   ├── index.js
│   ├── models/
│   ├── routes/
│   └── controllers/
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── package.json
└── .env (create this)
```

### **Step 2: Environment Setup**

**Create `.env` file in root directory:**
```env
MONGO=mongodb+srv://username:password@cluster.mongodb.net/mern-estate
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

**Create `client/.env.local` file:**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

### **Step 3: Install Dependencies**
```bash
# Root directory
npm install

# Client directory
cd client
npm install
cd ..
```

### **Step 4: Start Backend Server**
```bash
# In root directory (mern-estate/)
npm run dev
```

**Expected Output:**
```
Server is running on port 3000
MongoDB connected successfully
```

### **Step 5: Start Frontend Server**
```bash
# In new terminal, go to client directory
cd client
npm run dev
```

**Expected Output:**
```
Local:   http://localhost:5173/
Network: use --host to expose
```

---

## 🎯 **Quick Fix Commands**

### **Option A: Manual Setup**
```bash
# Terminal 1 - Backend
cd mern-estate
npm install
npm run dev

# Terminal 2 - Frontend  
cd mern-estate/client
npm install
npm run dev
```

### **Option B: Use Our Scripts**
```bash
# Windows
./start.bat

# Mac/Linux
chmod +x start.sh
./start.sh
```

---

## 🏠 **Add Sample Properties (Fix Empty Database)**

### **Method 1: Through the App**
1. Go to http://localhost:5173
2. Sign up for a new account
3. Go to Profile → Create Listing
4. Add some properties manually

### **Method 2: API Testing**
Test if backend is working:
```bash
# Test API endpoint
curl http://localhost:3000/api/listing/get
```

---

## 🔍 **Common Issues & Solutions**

### **Issue 1: "Cannot GET /"**
**Solution:** Backend server not running
```bash
cd mern-estate
npm run dev
```

### **Issue 2: "Network Error"**
**Solution:** Check if both servers are running
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### **Issue 3: "MongoDB Connection Failed"**
**Solution:** Check your MongoDB connection string
```env
# In .env file
MONGO=mongodb+srv://username:password@cluster.mongodb.net/mern-estate
```

### **Issue 4: "Firebase Error"**
**Solution:** Add Firebase config
```env
# In client/.env.local
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### **Issue 5: Port Already in Use**
**Solution:** Kill existing processes
```bash
# Kill port 3000
npx kill-port 3000

# Kill port 5173  
npx kill-port 5173
```

---

## 🎉 **Success Checklist**

✅ **Backend running** on http://localhost:3000  
✅ **Frontend running** on http://localhost:5173  
✅ **MongoDB connected** (check terminal logs)  
✅ **No console errors** in browser  
✅ **Can access home page** with beautiful UI  
✅ **Can sign up/sign in** successfully  
✅ **Can create listings** through profile  

---

## 🆘 **Still Having Issues?**

### **Reset Everything:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

cd client
rm -rf node_modules package-lock.json  
npm install
cd ..
```

### **Check Logs:**
- Backend terminal for MongoDB connection
- Browser console for frontend errors
- Network tab for API call failures

---

## 🌟 **Expected Result**

After following this guide, you should see:
- ✅ Beautiful glass morphism home page
- ✅ Modern authentication pages  
- ✅ Responsive property listings
- ✅ Dark/light mode toggle
- ✅ Professional animations
- ✅ Working property creation/viewing

**Your MERN Estate app should be running perfectly! 🏠✨**