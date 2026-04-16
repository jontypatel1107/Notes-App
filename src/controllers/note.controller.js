const mongoose = require('mongoose');
const Note = require('../models/note.model');

const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body || {};
    const normalizedTitle = typeof title === 'string' ? title.trim() : title;
    const normalizedContent = typeof content === 'string' ? content.trim() : content;

    if (!normalizedTitle || !normalizedContent) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null,
      });
    }

    const note = await Note.create({
      title: normalizedTitle,
      content: normalizedContent,
      category,
      isPinned,
    });

    return res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      data: null,
    });
  }
};

const createBulkNotes = async (req, res) => {
  try {
    const notes = req.body?.notes;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Notes array is required',
        data: null,
      });
    }

    const normalizedNotes = notes.map((note) => {
      const title = typeof note?.title === 'string' ? note.title.trim() : note?.title;
      const content = typeof note?.content === 'string' ? note.content.trim() : note?.content;

      if (!title || !content) {
        return null;
      }

      return {
        title,
        content,
        category: note?.category,
        isPinned: note?.isPinned,
      };
    });

    if (normalizedNotes.some((note) => note === null)) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(normalizedNotes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      data: null,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      data: null,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note fetched successfully',
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      data: null,
    });
  }
};

const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body || {};
    const normalizedTitle = typeof title === 'string' ? title.trim() : title;
    const normalizedContent = typeof content === 'string' ? content.trim() : content;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null,
      });
    }

    if (!normalizedTitle || !normalizedContent) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null,
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: normalizedTitle,
        content: normalizedContent,
        category,
        isPinned,
      },
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note replaced successfully',
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
};
