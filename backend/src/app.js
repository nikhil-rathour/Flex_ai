import express from "express";
import cors from "cors";
import userRouter from "./auth/authRouter.js"
import  geminiRouter from "./gemini/geminiRouter.js";
import paletteRouter from "./palette/paletteRouter.js";
import codeStorageRouter from "./codeStorage/codeStorageRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api", paletteRouter);
app.use("/api/codes", codeStorageRouter);

app.get("/", (req, res) => {
    res.status(200).send("OK flex Ai");
});

export default app;