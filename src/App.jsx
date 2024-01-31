import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import UpdateNotes from "./pages/UpdateNotes";
import CreateNotes from "./pages/CreateNotes";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/createnotes" element={<CreateNotes />} />
        <Route path="/updatenotes/:id" element={<UpdateNotes />} />
      </Routes>
    </>
  );
}

export default App;
