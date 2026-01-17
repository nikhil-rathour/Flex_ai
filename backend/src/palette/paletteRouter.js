import express from "express";
import { palettes } from "../data/palettes.js";

const router = express.Router();

router.get("/palettes", (req, res) => {
  res.json(palettes);
});

export default router;
