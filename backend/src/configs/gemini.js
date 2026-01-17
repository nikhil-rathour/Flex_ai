import { configDotenv } from "dotenv";
configDotenv();
import { GoogleGenerativeAI } from "@google/generative-ai";
const key = `${process.env.GEMINI_API_KEY}`  ;
const genAI = new GoogleGenerativeAI(key);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});
