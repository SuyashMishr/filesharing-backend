import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import router from "./routes/routes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();
router.post("/upload", async (req, res) => {
  try {
    // your logic to handle file upload
    const file = await File.create({ ... });

    // redirect to frontend page after successful upload
    res.redirect("https://file-sharing-frontend-six.vercel.app/success");
  } catch (error) {
    res.status(500).send("Upload failed");
  }
});


const app = express();
app.use(cors({
  origin: "https://file-sharing-frontend-six.vercel.app", // or use an env variable here
  credentials: true // if you’re using cookies/auth
}));
app.use(express.json());
app.use('/', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
