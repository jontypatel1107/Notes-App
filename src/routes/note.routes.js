const express = require('express');
const { createNote, createBulkNotes } = require('../controllers/note.controller');

const router = express.Router();

router.post('/', createNote);
router.post('/bulk', createBulkNotes);

module.exports = router;
