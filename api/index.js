import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

  app.use(express.json());
app.listen(3000, () => {
  console.log(`Server is Running on Port 3000!`);
});
//connect to mongoose

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
