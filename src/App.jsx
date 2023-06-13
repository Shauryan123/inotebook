import "./App.css";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";


function App() {
  const [hide, setHide] = useState(false);
  // let location = useLocation();
  useEffect(() => {
    localStorage.clear();
  }, []);

  // useEffect(() => {
  //   if (location.pathname == '/login') {
  //     setHide(true);
  //   }
  // }, [location]);
  return (
    <>
      <NoteState>
        <Router>
          {<Navbar />}
          <div className="container-fluid mx-0 px-0">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/userProfile" element={<User/>} />
              <Route exact path="/resetpassword" element={<ResetPassword/>} />
              <Route exact path="/dashboard" element={<Dashboard/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
