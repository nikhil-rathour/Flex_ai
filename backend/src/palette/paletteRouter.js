import express from "express";
import { verifyFirebaseToken } from "../auth/middelware/firebase_middleware.js";
import {
  createPalette,
  deletePalette,
  getPaletteById,
  getPalettes,
  updatePalette
} from "./paletteController.js";

const router = express.Router();

router.get("/palettes", getPalettes);
router.get("/palettes/:id", getPaletteById);

router.post("/palettes", verifyFirebaseToken, createPalette);
router.put("/palettes/:id", verifyFirebaseToken, updatePalette);
router.delete("/palettes/:id", verifyFirebaseToken, deletePalette);

export default router;
