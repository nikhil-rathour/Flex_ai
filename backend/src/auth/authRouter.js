import express from "express";
import { verifyFirebaseToken } from "./middelware/firebase_middleware.js";
import { userCreation } from "./authController.js";

const userRouter = express.Router();

userRouter.post("/login", verifyFirebaseToken, userCreation);

export default userRouter;
