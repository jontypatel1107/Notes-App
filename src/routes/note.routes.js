const express = require('express');
const { createNote, createBulkNotes, getAllNotes } = require('../controllers/note.controller');

const router = express.Router();

router.post('/', createNote);
router.post('/bulk', createBulkNotes);
router.get('/', getAllNotes);

module.exports = router;
