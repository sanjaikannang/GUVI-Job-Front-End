import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    // Fetch notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        "https://sanjaikannan-guvi-job.onrender.com/notes/all",
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        // Handle error response
        console.error("Error fetching notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateNote = (newNote) => {
    // Update the state to include the newly created note
    setNotes([...notes, newNote]);
  };

  const handleUpdateNote = (noteId) => {
    // Find the note with the given noteId
    const selectedNote = notes.find((note) => note._id === noteId);

    // Check if the note is found
    if (selectedNote) {
      // Navigate to the UpdateNotes page with the correct noteId
      navigate(`/updatenotes/${selectedNote._id}`);
    } else {
      console.error(`Note with id ${noteId} not found.`);
    }
  };

  const handleDeleteNote = async (noteId) => {
    // Implement the logic for deleting a note
    try {
      const response = await fetch(
        `https://sanjaikannan-guvi-job.onrender.com/notes/delete/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        // Remove the deleted note from the state
        setNotes(notes.filter((note) => note._id !== noteId));
        // Display alert message
        setAlertMessage("Note Deleted Successfully !!");
        // Clear alert message after a few seconds
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      } else {
        // Handle error response
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const renderNoteCards = () => {
    return notes.map((note, index) => (
      <div
        key={note._id}
        className={`note-card ${
          index === 0 ? "small-card" : "big-card"
        } bg-rose-50 rounded-xl overflow-hidden shadow-lg mb-4 p-4 transition-transform transform hover:scale-105 hover:rounded-none`}
      >
        <strong className="text-2xl mb-2 block font-serif">{note.title}</strong>
        <p className="text-gray-600 mb-4">{note.description}</p>
        <p
          className={`text-gray-700 mb-4 ${
            isDeadlinePassed(note.deadline) ? "line-through" : ""
          }`}
        >
          Deadline: {new Date(note.deadline).toLocaleString("en-US")}
        </p>
        <div className="note-icons flex justify-end items-end">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => handleUpdateNote(note._id)}
            className="icon update-icon text-blue-500 cursor-pointer mr-2"
            size="2x"
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => handleDeleteNote(note._id)}
            className="icon delete-icon text-red-500 cursor-pointer"
            size="2x"
          />
        </div>
      </div>
    ));
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className="text-rose-400">Notes </span> App
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-white font-medium px-4 py-2 rounded-md bg-rose-400"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4 lg:p-8">
        <button
          className="bg-rose-400 rounded-md text-white py-2 px-4 my-4 w-full lg:w-auto"
          onClick={() => navigate("/createnotes")}
        >
          Add Notes
        </button>
        <br />
        <br />
        {/* Display Notes */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 note-container">
          {renderNoteCards()}
        </div>

        {/* Display Alert Message */}
        {alertMessage && (
          <div className="fixed top-0 right-0 p-4 bg-green-500 text-white">
            {alertMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
