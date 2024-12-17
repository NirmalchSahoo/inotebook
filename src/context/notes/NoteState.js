import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: '676011edbbae2eb1f943b10c',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:33.900Z',
      __v: 0,
    },
    {
      _id: '676011eebbaee2eb1f943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efbbae2eb1f9e43b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
    {
      _id: '676011eebbae2eb1wf943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efbbae2eb1f9d43b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
    {
      _id: '676011eebbae2ebd1f943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efdbbae2eb1f943b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
  ];

  // functions

  // add a note
  const addNote = (title, description, tag) => {
    // todo -- api call
    console.log('Adding a new note ');
    const note = {
      _id: '676011efdbbae2deb1f943b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: title,
      description: description,
      tag: tag,
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    };
    // add new note
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = (id) => {
    // todo -- api call
    console.log('Deleteing the note ', id);
    const newNotes = notes.filter((note) => {
      return note._id === id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = (id, title, description, tag) => {};

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
