import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import studentsRouter from './routes/students.js';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS + static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing + method override for PUT/DELETE from forms
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MongoDB connection
const uri = process.env.MONGO_DB_URI || ""
mongoose.connect(uri).then(() =>{
  console.log("MongoDB Connected")
}).catch(err =>{
  console.error("MongoDB Connection Error:", err)
})

// Home
app.get('/', (req, res) => {
  res.redirect('/students');
});

// Routes
app.use('/students', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Student Starter running at http://localhost:${PORT}`);
});
