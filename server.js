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

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
