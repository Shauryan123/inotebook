import React, { useContext, useEffect } from 'react';
import noteContext from '../context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
const UserProfilePopup = () => {

  const context = useContext(noteContext);
  const {user, getUser, noteCount} = context;

  const navigate = useNavigate();

  useEffect(() => {
    // Google Analytics
    // console.log("Hi i am in the user profile popup");
    if (localStorage.getItem('token')) {

      getUser();

    } else {

      navigate('/login');
    }


  },[]);
  return (
    <div className="user-profile-popup">
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* <p>Number of Notes: {user.numberOfNotes}</p> */}
      <p>Number of Notes: {user.numberOfNotes}</p>
    </div>
  );
};

export default UserProfilePopup;