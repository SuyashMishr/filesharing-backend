import express from 'express';
import File from '../models/file.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      path: req.file.path,           // local path to file on server
      name: req.file.originalname,   // original file name
      // downloadCount will default to 0 automatically
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
  router.get('/file/:fileId/status', checkFileStatus);
});


export default router;
