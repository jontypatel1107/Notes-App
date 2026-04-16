const express = require('express');
const { createNote, createBulkNotes, getAllNotes, getNoteById } = require('../controllers/note.controller');

const router = express.Router();

router.post('/', createNote);
router.post('/bulk', createBulkNotes);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);

module.exports = router;
