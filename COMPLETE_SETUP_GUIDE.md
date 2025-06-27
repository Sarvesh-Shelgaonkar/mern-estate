# 🚀 MERN Estate - Complete Setup Guide

## 🚨 ISSUE IDENTIFIED: Node.js Not Installed

### **Step 1: Install Node.js**

**Download & Install Node.js:**
1. Go to: https://nodejs.org/
2. Download **LTS version** (recommended)
3. Run the installer
4. Follow installation steps
5. Restart your computer

**Verify Installation:**
```bash
node --version
npm --version
```

### **Step 2: Install Dependencies**

**Backend Dependencies:**
```bash
cd mern-estate
npm install
```

**Frontend Dependencies:**
```bash
cd client
npm install
cd ..
```

### **Step 3: Environment Setup**

**Create `.env` file in root directory:**
```env
MONGO=mongodb+srv://your-username:your-password@cluster.mongodb.net/mern-estate
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_123456789
```

**Create `client/.env.local` file:**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

### **Step 4: Start the Application**

**Method 1: Manual Start**
```bash
# Terminal 1 - Backend
cd mern-estate
npm run dev

# Terminal 2 - Frontend
cd mern-estate/client
npm run dev
```

**Method 2: Use Our Script**
```bash
# Windows
./start.bat

# Mac/Linux
chmod +x start.sh
./start.sh
```

### **Step 5: Access Your App**
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

---

## 🔧 Alternative Solutions

### **Option A: Use Online IDE**
1. **CodeSandbox:** https://codesandbox.io/
2. **Replit:** https://replit.com/
3. **GitPod:** https://gitpod.io/

### **Option B: Use Docker (Advanced)**
```bash
# If you have Docker installed
docker-compose up
```

---

## 🆘 Common Issues & Solutions

### **Issue 1: "npm not found"**
**Solution:** Install Node.js first

### **Issue 2: "Permission denied"**
**Solution:** Run as administrator or use sudo (Mac/Linux)

### **Issue 3: "Port already in use"**
**Solution:**
```bash
npx kill-port 3000
npx kill-port 5173
```

### **Issue 4: "MongoDB connection failed"**
**Solution:** Check your MongoDB connection string in `.env`

### **Issue 5: "Firebase error"**
**Solution:** Add Firebase API key in `client/.env.local`

---

## 🎯 Quick Test Commands

**Test if Node.js is working:**
```bash
node -e "console.log('Node.js is working!')"
```

**Test if npm is working:**
```bash
npm --version
```

**Test backend:**
```bash
cd mern-estate
npm run dev
```

**Test frontend:**
```bash
cd mern-estate/client
npm run dev
```

---

## 🌟 Expected Results

After setup, you should see:

**Backend Terminal:**
```
Server is running on port 3000
MongoDB connected successfully
```

**Frontend Terminal:**
```
Local:   http://localhost:5173/
Network: use --host to expose
```

**Browser:**
- Beautiful glass morphism home page
- Modern authentication pages
- Professional property listings
- Responsive design
- Dark/light mode toggle

---

## 📞 Need Help?

If you're still having issues:

1. **Check Node.js installation:** `node --version`
2. **Check npm installation:** `npm --version`
3. **Check if ports are free:** `netstat -an | findstr :3000`
4. **Check MongoDB connection**
5. **Check Firebase configuration**

**Your beautiful MERN Estate app will be running soon! 🏠✨**