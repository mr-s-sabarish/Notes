import { useState, useEffect, useRef } from "react";
import "./MiniNotesApp.css";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

export default function MiniNotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  
  const inputRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (title.trim() === "" && message.trim() === "") return;

    const newNote = {
      id: Date.now(),
      title,
      message,
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
    setTitle("");
    setMessage("");
    inputRef.current.focus();
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleCompleted = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleClearAll = () => {
    setNotes([]);
  };

  return (
    <div className="notes-app">
      <div className="header">
        <h1>Mini Notes</h1>
        <HiClipboardDocumentCheck className="note-icon" />
      </div>

      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of your note..."
        />
        <textarea
          ref={messageRef}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      {notes.length === 0 ? (
        <div className="no-notes">
          <p>No notes yet...</p>
          <h2>Drop your Thoughts here...</h2>
          <p>"Finish the UI design for notes app"</p>
          <p>"Call the dentist to reschedule appointment"</p>
          <p>"Buy groceries for the week"</p>
        </div>
      ) : (
        <div className="notes-container">
          <h5>"One step at a time. Always forward..."</h5>
          <ul className="note-list">
            {notes.map((note, index) => (
              <li
                key={note.id}
                className={`note-item ${
                  note.completed ? "note-completed" : "note-pending"
                }`}
              >
                <div className="note-content">
                  <h3>{index + 1}</h3>
                  <p className={note.completed ? "completed" : "pending"}>
                    {note.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <div className="note-text">
                  <p className="tagged-notes">Your Notes here,</p>
                  <p className="note-text-p">
                    <strong>Title: </strong>
                    {note.title}
                  </p>
                  <p className="note-text-p">
                    {" "}
                    <strong>Message: </strong>
                    {note.message}
                  </p>
                </div>

                <div className="note-actions">
                  <span className="timestamp">
                    Created at : {note.createdAt}
                  </span>
                  <div className="button-group">
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

      {notes.length > 0 && (
        <div className="clear-all">
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      )}
    </div>
  );
}
