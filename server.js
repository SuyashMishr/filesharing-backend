import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import router from "./routes/routes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();



const app = express();
app.use(cors({
  origin: ['http://localhost:3000',"https://file-sharing-frontend-six.vercel.app"], // or use an env variable here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you’re using cookies/auth
}));
app.use(express.json());
app.use('/', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
