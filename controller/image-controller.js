import File from '../models/file.js';

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Parse maxDownloads from request body
  const maxDownloads = req.body.maxDownloads ? parseInt(req.body.maxDownloads) : null;
  
  const fileObj = {
    path: `/uploads/${req.file.filename}`,
    name: req.file.originalname,
    maxDownloads: maxDownloads
  };

  try {
    const file = await File.create(fileObj);
    res.status(200).json({ 
      path: `https://filesharing-backend-t3ym.onrender.com/file/${file._id}`,
      maxDownloads: file.maxDownloads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if the file has reached max downloads
    if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
      return res.status(410).json({ error: 'Link has expired after reaching maximum downloads' });
    }

    // Increment download count
    file.downloadCount += 1;

    // Save updated download count
    await file.save();

    // Serve the file
    res.download(file.path, file.name, async (err) => {
      if (err) {
        console.error("Error during download:", err);
        return res.status(500).json({ error: 'Error during download' });
      }

      // After download, check if it was the final allowed one
      if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
        // Optionally delete the file from disk
        fs.unlink(file.path, (err) => {
          if (err) console.error('Failed to delete file:', err);
        });

        // Optionally delete the database entry
        // await File.findByIdAndDelete(file._id);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkFileStatus = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const isExpired = file.maxDownloads && file.downloadCount >= file.maxDownloads;
    
    res.status(200).json({
      expired: isExpired,
      downloadCount: file.downloadCount,
      maxDownloads: file.maxDownloads,
      remainingDownloads: file.maxDownloads ? Math.max(0, file.maxDownloads - file.downloadCount) : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
