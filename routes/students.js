import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Helper to read/write JSON "database"
const dataPath = path.join(__dirname, '..', 'data', 'students.json');

function readStudents() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeStudents(arr) {
  fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2));
}

// INDEX — list + basic search
router.get('/', (req, res) => {
  const { search = '', cohort = '' } = req.query;
  let students = readStudents();
  if (search) {
    const re = new RegExp(search, 'i');
    students = students.filter(s =>
      re.test(s.firstName) || re.test(s.lastName) || re.test(s.email) || re.test(s.interests || '')
    );
  }
  if (cohort) {
    students = students.filter(s => s.cohort === cohort);
  }
  res.render('students/index', { students, search, cohort });
});

// NEW — show form
router.get('/new', (req, res) => {
  res.render('students/new');
});

// CREATE — handle form
router.post('/', (req, res) => {
  const students = readStudents();
  const { firstName, lastName, email, cohort, interests } = req.body;
  const doc = {
    id: Date.now().toString(36),
    firstName, lastName, email, cohort, interests,
    createdAt: new Date().toISOString()
  };
  students.unshift(doc);
  writeStudents(students);
  res.redirect('/students');
});

// SHOW
router.get('/:id', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).send('Not found');
  res.render('students/show', { student });
});

// EDIT — form
router.get('/:id/edit', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).send('Not found');
  res.render('students/edit', { student });
});

// UPDATE
router.put('/:id', (req, res) => {
  const students = readStudents();
  const i = students.findIndex(s => s.id === req.params.id);
  if (i === -1) return res.status(404).send('Not found');
  const { firstName, lastName, email, cohort, interests } = req.body;
  students[i] = { ...students[i], firstName, lastName, email, cohort, interests };
  writeStudents(students);
  res.redirect(`/students/${students[i].id}`);
});

// DELETE
router.delete('/:id', (req, res) => {
  let students = readStudents();
  const before = students.length;
  students = students.filter(s => s.id !== req.params.id);
  if (students.length === before) return res.status(404).send('Not found');
  writeStudents(students);
  res.redirect('/students');
});

export default router;
