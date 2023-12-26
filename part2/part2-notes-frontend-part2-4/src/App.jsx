import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [importance, setImportance] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: importance,
    };

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
      setImportance(false);
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleCheck = (event) => {
    setImportance(event.target.checked)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <input type="checkbox" onChange={handleCheck} checked={importance}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
