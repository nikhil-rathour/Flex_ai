import express from "express";
import { verifyFirebaseToken } from "../auth/middelware/firebase_middleware.js";
import { generateGeminiCode, generateAboutSection, updateExistingCode } from "./geminiController.js";

const geminiRouter = express.Router();

geminiRouter.post("/generate", generateGeminiCode);
geminiRouter.post("/generate-about", generateAboutSection);
geminiRouter.post("/update-code", verifyFirebaseToken, updateExistingCode);

export default geminiRouter;
