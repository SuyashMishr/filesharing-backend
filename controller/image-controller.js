import File from '../models/file.js';

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileObj = {
    path: req.file.path,
    name: req.file.originalname
  };

  try {
    const file = await File.create(fileObj);
    res.status(200).json({ path: `https://filesharing-backend-khaki.vercel.app//file/${file._id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    file.downloadCount++;
    await file.save();
    res.download(file.path, file.name);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
