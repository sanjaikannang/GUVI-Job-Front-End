import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateNote = async () => {
    // Reset previous error messages
    setTitleError("");
    setDescriptionError("");
    setDeadlineError("");

    // Validate inputs
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }

    if (!deadline) {
      setDeadlineError("Deadline is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        "https://sanjaikannan-guvi-job.onrender.com/notes/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, deadline }),
        }
      );

      if (response.ok) {
        // Clear input fields
        setTitle("");
        setDescription("");
        setDeadline("");
        // Display alert message
        setAlertMessage("Note Created Successfully!");
        // Navigate to the homepage after a few seconds
        setTimeout(() => {
          setAlertMessage(null);
          navigate("/homepage");
        }, 3000);
      } else {
        // Handle error response
        console.error("Error creating note:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating note:", error.message);
    }
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
      <div className="container mx-auto p-4 lg:p-8">
        <div className="max-w-md mx-auto bg-rose-50 rounded-md p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-4">Create a New Note !</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-rose-400 ${
                  titleError && "border-red-500"
                }`}
                required
              />
              {titleError && (
                <p className="text-red-500 text-sm">{titleError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-rose-400 ${
                  descriptionError && "border-red-500"
                }`}
                required
              ></textarea>
              {descriptionError && (
                <p className="text-red-500 text-sm">{descriptionError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-rose-400 ${
                  deadlineError && "border-red-500"
                }`}
                required
              />
              {deadlineError && (
                <p className="text-red-500 text-sm">{deadlineError}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCreateNote}
                className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500 focus:outline-none focus:shadow-outline-rose"
              >
                Create Note
              </button>
            </div>
          </form>
          {/* Display Alert Message */}
          {alertMessage && (
            <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default CreateNotes;
