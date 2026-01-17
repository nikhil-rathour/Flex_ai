import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC5h3gZ2bCa4ihMPckiW5PxtZr_uQ4h3bM");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});
