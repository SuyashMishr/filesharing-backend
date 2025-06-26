import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  downloadImage,
  checkFileStatus
} from '../controllers/image-controller.js';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// ✅ Route to upload file
router.post('/upload', upload.single('file'), uploadImage);

// ✅ Route to download file
router.get('/file/:fileId', downloadImage);

// ✅ Route to check file status (downloads left, expired, etc.)
router.get('/file/:fileId/status', checkFileStatus);

export default router;
