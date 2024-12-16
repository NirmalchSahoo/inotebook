const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchUser = require('../middleware/fetchUsers');
const { body, validationResult } = require('express-validator');

// ROUTE 1
// get All notes using : GET "/api/note/getallnotes" . // login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occured');
  }
});

// ROUTE 2
// Add a new note  : POST "/api/note/addnote"  // login required

router.post(
  '/addnote',
  fetchUser,
  [
    // title must be at least 5 chars long
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    // descriptiom must be at least 5 chars long
    body('description', 'Description must be atleast 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors returb bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some error occured');
    }
  }
);

// ROUTE 3
// upadte a existing note note  : PUT "/api/note/updatenote/:id" .  // login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a new object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.send(404).send('Not found');
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occured');
  }
});
// ROUTE 4
// delete a existing note   : DELETE "/api/note/deletenote" .  // login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // find the note to be updated and deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.send(404).send('Not found');
    }
    // allow deleteion only id user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send({ Success: 'Note has been deleted', note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occured');
  }
});

module.exports = router;
