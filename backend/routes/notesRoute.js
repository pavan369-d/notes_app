const express = require('express');
const { createNotes, getNotes, getNote, updateNotes, deleteNote } = require('../controllers/notesController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/',createNotes)

router.get('/',getNotes)

router.get('/:id',getNote)

router.put('/:id',updateNotes)

router.delete('/:id',deleteNote)

module.exports = router