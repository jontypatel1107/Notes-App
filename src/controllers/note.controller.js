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

module.exports = {
  createNote,
};
