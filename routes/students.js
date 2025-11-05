import express from 'express';
import Student from '../models/Student.js';
const router = express.Router()

// INDEX — list + basic search
router.get('/', async (req, res) => {
  const { search = '', cohort = '' } = req.query;
  const q = {}
  if (search) {
    const re = new RegExp(search, 'i');
    // creates a reg expression object fron the value of search and with 'i' makes it case-insensitive
    // EX: if search='jose' the regex would equal /jose/i
    q.$or = [
      // $or is a MongoDB that is used to match any of the conditions inside an array where each entry in the array is a condition to be matched
      {firstName:re},
      {lastName:re},
      {emailName:re},
      {interests:re}
    ]
    if(cohort) q.cohort = cohort
  }
  const students = await Student.find(q).sort({createdAt: -1}).lean()
  res.render('students/index', { students, search, cohort });
});

// NEW — show form
router.get('/new', (req, res) => {
  res.render('students/new');
});

// CREATE — handle form
router.post('/', async (req, res) => {
  const { firstName, lastName, email, cohort, interests } = req.body;
  await Student.create({firstName, lastName, email, cohort, interests})
  // firstName = firstName:firstName, lastName = lastName:lastName, etc.
  res.redirect('/students');
});

// SHOW
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req,params.id).lean()
  if (!student) return res.status(404).send('Not found');
  student.createdAt = student.createdAt || new Date()
  res.render('students/show', { student });
});

// EDIT — form
router.get('/:id/edit', async (req, res) => {
  const student = await Student.findById(req,params.id).lean()
  if(!student){return res.status(404).send("Not Found")}
  res.render('students/edit', { student:{...student}, id:student._id});
});

// UPDATE
router.put('/:id', async (req, res) => {
  const {firstName, lastName, email, cohort, interests} = req.body;
  const student = await Student.findByIdAndUpdate(req.params.id, {firstName, lastName, email, cohort, interests}, {new: true})
  if(!student){return res.status(404).send("Not Found")}
  res.redirect(`/students/${s._id}`);

  // findByIdandUpdate
  // Mongoose schema functions
  // use req.body for data
});

// DELETE
router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id)
  if(!student){return res.status(404).send("Not Found")}
  res.redirect(`/students`);
});

export default router;
