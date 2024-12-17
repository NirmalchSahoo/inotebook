import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;

  return (
    <>
      <AddNote />
      <div className="container">
        <h2 className="my-3">Your Notes</h2>
        <div className="row">
          {notes &&
            notes.map((note) => <Noteitem key={note._id} note={note} />)}
        </div>
      </div>
    </>
  );
};

export default Notes;
