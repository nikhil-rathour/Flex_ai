import express from 'express';
import { verifyFirebaseToken } from '../auth/middelware/firebase_middleware.js';
import {
  saveGeneratedCode,
  getUserCodes,
  getCodeById,
  deleteCode,
  updateCode,
  checkUsername,
  getCodeByUsername,
  getCodeForEdit
} from './codeStorageController.js';

const router = express.Router();

router.post('/codes', verifyFirebaseToken, saveGeneratedCode);
router.post('/check-username', verifyFirebaseToken, checkUsername);
router.get('/get-codes', verifyFirebaseToken, getUserCodes);
router.get('/get-codes/:id', verifyFirebaseToken, getCodeById);
router.get('/edit-code/:id', verifyFirebaseToken, getCodeForEdit);
router.put('/update-codes/:id', verifyFirebaseToken, updateCode);
router.delete('/delete-codes/:id', verifyFirebaseToken, deleteCode);
router.get('/:username', getCodeByUsername);

export default router;
