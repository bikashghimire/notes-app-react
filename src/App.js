import React, {useState, useEffect} from 'react'
import NotesList from './components/NotesList'
import {nanoid} from 'nanoid'
import Search from './components/search';
import Header from './components/Header';

function app() {
  // notes example 
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is note",
      date: "04/04/2020"
    },
    {
      id: nanoid(),
      text: "This is second  note",
      date: "04/04/2021"
    },
    {
      id: nanoid(),
      text: "This is third note",
      date: "04/04/2022"
    },

  ]);
  // these are the states for searching text and toggle mode
  const [searchNote, setSearchNote] = useState('');
  const [darkMode, setDarkMode]     = useState(false)

  // to store or save data in local storage even after closing the tab
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app-react-data'))
    if(!savedNotes) {
      setNotes(savedNotes)
    }
  }, [])
  // This is for saving the app data in local storage
  useEffect(() => {
    localStorage.setItem('notes-app-react-data', JSON.stringify(notes))
  }, [notes])

  // This function is for adding new notes
  const addNote = (text) =>{
    const date = new Date();
    const newNote = {
      id:nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }
  // Following function is used to delete notes in the note app with a id
  const deletingNote = (id) => {
    const newNotes = notes.filter((note) => note.id!==id);
    setNotes(newNotes)
  }
  return{
    <div className = {`${darkMode && `dark-mode`}`}>
    <div className = "container">
    <Header handleToggleDarkMode = {setDarkMode}/>

    <Search handleSearch = {setSearchNote}/>

    <NotesList notes = {notes.filter((note) => note.text.toLowerCase().includes(searchNote))}
    handleAddNote = {addNote} handleDelete = (deleteingNote)/>

    </div>
    </div>
  }
  
}

export dafault App