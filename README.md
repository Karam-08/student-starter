# EJS + JSON Student Starter (No MongoDB)

A lightweight Express + EJS app that manages a student roster using a JSON file as storage.
Perfect for practicing routes, forms, EJS views/partials, and CRUD without any database.

## Quick Start
1. **Install**: `npm install`
2. **Run**: `npm run dev` then open http://localhost:3000
3. Explore `/views` and `/routes/students.js` to see how EJS and Express work together.

## EJS Lint (Syntax Check)
Run a syntax check over all EJS templates:
```bash
npm run lint:ejs
```

## Your Tasks
- Add validation messages if fields are missing.
- Add a "Year 3" cohort option.
- Add a "GPA" field (0.0–4.0) and display it on the index and show pages.
- Enhance search to match cohort OR interests only (add UI checkbox).
- Style the table for mobile (stacked rows on narrow screens).
- Bonus: Add CSV export of the current filtered list.
