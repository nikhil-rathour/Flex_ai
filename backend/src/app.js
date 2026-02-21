import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./auth/authRouter.js"
import  geminiRouter from "./gemini/geminiRouter.js";
import paletteRouter from "./palette/paletteRouter.js";
import codeStorageRouter from "./codeStorage/codeStorageRouter.js";
import connectDB from "./configs/db.js";
import { syncPalettesFromSeed } from "./palette/paletteSeedService.js";

const app = express();
let initPromise = null;
let palettesSynced = false;

const ensureInitialized = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  if (!palettesSynced) {
    await syncPalettesFromSeed();
    palettesSynced = true;
  }
};

const initializeOnce = async () => {
  if (!initPromise) {
    initPromise = ensureInitialized().catch((error) => {
      initPromise = null;
      throw error;
    });
  }

  return initPromise;
};

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await initializeOnce();
    next();
  } catch (error) {
    console.error("Server initialization error:", error);
    res.status(500).json({ message: "Server initialization failed" });
  }
});
app.use("/api/users", userRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api", paletteRouter);
app.use("/api/codes", codeStorageRouter);

app.get("/", (req, res) => {
    res.status(200).send("OK flex Ai");
});

export default app;
