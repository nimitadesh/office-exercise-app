import React from "react";
import "../styles/app-styles.css";
import "../styles/fonts.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./log-in/Login";
import Signup from "./sign-up/Signup";
import WorkoutsPage from "./workout/WorkoutsPage";
import Navbar from "./home/HomeComp/Navbar";
import Chatbot from "./chatbot/Chatbot";

import HomePage from "./home/HomePage";
import "@fontsource/inria-sans";
import "@fontsource/inria-sans/300-italic.css";
import ChatHistory from "./chatbot/ChatHistory";
import UserDashboard from "./dashboard/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>{<Route path="/" element={<HomePage />} />}</Routes>
        <Routes>{<Route path="/login" element={<Login />} />}</Routes>
        <Routes>{<Route path="/signup" element={<Signup />} />}</Routes>
        <Routes>{<Route path="/chatbot" element={<Chatbot />} />}</Routes>
        <Routes>{<Route path="/history" element={<ChatHistory />} />}</Routes>
        <Routes>{<Route path="/workouts" element={<WorkoutsPage />} />}</Routes>
        <Routes>{<Route path="/dashboard" element={<UserDashboard />} />}</Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
