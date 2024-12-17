import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;

  return (
    <div className="container">
      <h2 className="my-3">Your Notes</h2>
      <div className="row">
        {notes &&
          notes.map((note, index) => <Noteitem key={index} note={note} />)}
      </div>
    </div>
  );
};

export default Notes;
