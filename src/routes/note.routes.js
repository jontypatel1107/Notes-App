const express = require('express');
const { createNote, createBulkNotes, getAllNotes, getNoteById, replaceNote, updateNote, deleteNote, deleteBulkNotes } = require('../controllers/note.controller');

const router = express.Router();

router.post('/', createNote);
router.post('/bulk', createBulkNotes);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.delete('/bulk', deleteBulkNotes);
router.delete('/:id', deleteNote);

module.exports = router;
