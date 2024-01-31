import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className="text-rose-400 font-bold">Notes </span> App
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="text-white font-medium px-4 py-2 rounded-md bg-rose-400"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="text-white font-medium px-4 py-2 rounded-md bg-rose-400"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero section with fullscreen display */}
      <section className="hero bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 text-gray-800 h-screen flex items-center">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <div className="hero-content text-center text-white">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">
              Organize Your Notes Effortlessly!
            </h1>
            <p className="hero-paragraph text-lg md:text-xl mb-6">
              Welcome to the OpenSource Notes Application.
              <br /> Your one-stop solution for organized and secure
              note-taking.
            </p>
            <div className="hero-options flex items-center justify-center">
              <button
                className="text-white font-medium px-6 py-3 rounded-full bg-purple-500"
                onClick={handleLogin}
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="flex flex-wrap justify-center">
            {/* Feature 1 */}
            <div className="feature-card bg-white p-6 rounded-lg shadow-lg mx-4 mb-4 transition-transform transform hover:scale-105 hover:rounded-none">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-gray-600">
                User-friendly interface for a seamless experience.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="feature-card bg-white p-6 rounded-lg shadow-lg mx-4 mb-4 transition-transform transform hover:scale-105 hover:rounded-none">
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your notes are kept private and secure.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="feature-card bg-white p-6 rounded-lg shadow-lg mx-4 mb-4 transition-transform transform hover:scale-105 hover:rounded-none">
              <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
              <p className="text-gray-600">
                Access your notes on any device with a responsive layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Content Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Notes App?</h2>
          <p className="text-lg text-gray-700">
            With Notes App, you get a feature-rich and intuitive note-taking
            experience. Take your productivity to the next level with our
            powerful and easy-to-use application.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
          <div className="flex flex-wrap justify-center">
            {/* Testimonial 1 */}
            <div className="testimonial-card bg-white p-6 rounded-lg shadow-lg mx-4 mb-4 transition-transform transform hover:scale-105 hover:rounded-none">
              <p className="text-gray-600">
                "Notes App has transformed the way I organize my thoughts. It's
                easy to use and has become an essential part of my daily
                routine."
              </p>
              <p className="text-purple-500 font-semibold mt-4">
                - Sanjai, Blogger
              </p>
            </div>
            {/* Testimonial 2 */}
            <div className="testimonial-card bg-white p-6 rounded-lg shadow-lg mx-4 mb-4 transition-transform transform hover:scale-105 hover:rounded-none">
              <p className="text-gray-600">
                "The security features of Notes App are impressive. I feel
                confident that my sensitive information is well-protected."
              </p>
              <p className="text-purple-500 font-semibold mt-4">
                - Kannan, Developer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 p-8 text-center">
        <p className="text-gray-600">
          &copy; 2024 Notes App. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default LandingPage;
