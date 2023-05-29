import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, {useContext, useState, useEffect} from 'react'
import { Home } from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoteState from "./context/Notes/NoteState";
import noteContext from './context/Notes/noteContext';
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/UserProfilePopup";
import TextRotator from "./components/TextRotator";

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/userProfile" element={<User/>} />
              </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
