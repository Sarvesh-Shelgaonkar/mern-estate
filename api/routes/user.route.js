import express from "express";
import { test } from "../controllers/user.controller.js";
import  {verityToken} from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", test);
router.post('/update/:id',verityToken, updateUser);
export default router;
