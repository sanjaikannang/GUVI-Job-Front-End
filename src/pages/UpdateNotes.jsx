import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    // Check if id is defined before fetching note details
    if (id) {
      fetchNoteDetails();
    }
  }, [id]);

  const fetchNoteDetails = async () => {
    try {
      // Check if id is defined before making the fetch request
      if (!id) {
        console.error("Note ID is undefined.");
        return;
      }

      const response = await fetch(
        `https://sanjaikannan-guvi-job.onrender.com/notes/details/${id}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const fetchedNote = await response.json();
        setNoteDetails({
          title: fetchedNote.title,
          description: fetchedNote.description,
          deadline: new Date(fetchedNote.deadline).toISOString().slice(0, 16),
        });
      } else {
        // Handle error response
        console.error("Error fetching note details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching note details:", error.message);
    }
  };

  const handleUpdateNote = async () => {
    // Implement the logic for updating the note
    try {
      const response = await fetch(
        `https://sanjaikannan-guvi-job.onrender.com/notes/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: noteDetails.title,
            description: noteDetails.description,
            deadline: noteDetails.deadline,
          }),
        }
      );

      if (response.ok) {
        // Display alert message
        setAlertMessage("Note Updated Successfully!");

        // Clear alert message after a few seconds
        setTimeout(() => {
          setAlertMessage(null);
          // Navigate to the homepage
          navigate("/homepage");
        }, 3000);
      } else {
        // Handle error response
        console.error("Error updating note:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails({
      ...noteDetails,
      [name]: value,
    });
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
      <br />

      {/* Display Alert Message */}
      {alertMessage && (
        <div className="fixed top-0 right-0 p-4 bg-green-500 text-white">
          {alertMessage}
        </div>
      )}
      <div className="container mx-auto p-4 lg:p-8">
        <div className="max-w-md mx-auto bg-rose-50 rounded-md p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-4">Update ths Notes !</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={noteDetails.title}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={noteDetails.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-600"
              >
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={noteDetails.deadline}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={handleUpdateNote}
              className="bg-rose-400 text-white py-2 px-4 my-4 w-full rounded-md"
            >
              Update Note
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default UpdateNotes;
