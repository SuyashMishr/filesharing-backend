import express from 'express';
import File from '../models/file.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    await file.save();

    res.status(200).json({
      message: "File uploaded successfully",
      path: `https://filesharing-backend-t3ym.onrender.com/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Upload failed");
  }
});


export default router;
