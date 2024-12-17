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
      _id: '676011eebbae2eb1f943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efbbae2eb1f943b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
    {
      _id: '676011eebbae2eb1f943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efbbae2eb1f943b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
    {
      _id: '676011eebbae2eb1f943b10e',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:34.485Z',
      __v: 0,
    },
    {
      _id: '676011efbbae2eb1f943b110',
      user: '675fcdabcc6ca1f95595dba4',
      title: 'My Title',
      description: 'Please wake up early',
      tag: 'Personal',
      date: '2024-12-16T11:41:35.049Z',
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
