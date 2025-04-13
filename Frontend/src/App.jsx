import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUpPage";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import ChatPage from "./Components/ChatPage";
import ProfilePage from "./Components/ProfilePage";
import CreateEventPage from "./Components/CreateEventPage";
import {UserContextProvider} from "./Store/userContext"
function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
