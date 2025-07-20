import { useState, useEffect, useRef } from "react";
import "./MiniNotesApp.css";
import { FaTrash } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa6";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

export default function MiniNotesApp() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      completed: false,
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
    inputRef.current.focus();
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleCompleted = (id) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    setNotes(updated);
  };

  const handleClearAll = () => {
    setNotes([]);
  };

  return (
    <div className="notes-app">
      {/* Header */}
      <div className="header">
        <h1>Mini Notes</h1>

        <span>
          <HiClipboardDocumentCheck className="note-icon" />
        </span>
      </div>

      {/* Input */}
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type a note..."
        />
        <button onClick={handleAddNote}>
          <FaNotesMedical className="add-icon" />
        </button>
      </div>

      {/* No Notes Placeholder */}
      {notes.length === 0 ? (
        <div className="no-notes">
          <p>No notes yet...</p>
          <h2>Drop your Thoughts here...</h2>
          <p>"Finish the UI design for notes app"</p>
          <p>"Call the dentist to reschedule appointment"</p>
          <p>"Buy groceries for the week"</p>
        </div>
      ) : (
        // Notes List
        <div className="notes-container">
          <h5>"One step at a time. Always forward..."</h5>
          <ul className="note-list">
            {notes.map((note, ind) => (
              <li
                key={note.id}
                className={`note-item ${
                  note.completed ? "note-completed" : "note-pending"
                }`}
              >
                {/* Note Content */}
                <div className="note-content">
                  <h3>{ind + 1}</h3>
                  <p className={`${note.completed ? "completed" : "pending"} `}>
                    {note.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                {/* Note Text */}
                <div className="note-text">
                  <p className="tagged-notes">Your Notes here,</p>
                  <p className="note-text-p">{note.text}</p>
                </div>

                {/* Actions */}
                <div className="note-actions">
                  <div>
                    <span className="timestamp">
                      Created at : {note.createdAt}
                    </span>
                  </div>

                  <div className="button-group">
                    {/* Complete Button */}
                    <button
                      className="complete-btn"
                      onClick={() => toggleCompleted(note.id)}
                    >
                      {note.completed ? (
                        <FaCheckCircle className="complete-icon" />
                      ) : (
                        <SiTicktick className="tick-icon" />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clear All Button */}
      {notes.length > 0 && (
        <div className="clear-all">
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      )}
    </div>
  );
}
