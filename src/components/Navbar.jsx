import React, {useEffect, useState,useContext} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/noteContext"
import Alert from "./Alert";

const Navbar = () => {



    const context = useContext(noteContext);
    const {notes, setNotes, addNote, showAlert, alert, user, getUser} = context;
    let navigate = useNavigate();

    let location = useLocation();

    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const toggleProfilePopup = () => {
      setIsProfilePopupOpen(!isProfilePopupOpen);
    };



    useEffect(() => {
      // Google Analytics
      console.log(location.pathname);
    },[location]);

    const handleUser = () => {

        navigate('/userProfile')

    }

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login')

    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname == '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname == '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>


                    </ul>
                   {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-2"  to="/signup">Sign Up</Link>
                    </form> : <button onClick={handleLogout} className='btn btn-primary'>Log Out </button>}
                    {localStorage.getItem('token') ?
                    <i className="fa-solid fa-user mx-3" onClick={handleUser} style={{ color: "#3a02d4" }}></i>
                    : ""}

                </div>
            </div>
        </nav>
        <Alert alert={alert}/>
        </>
    )
}

export default Navbar