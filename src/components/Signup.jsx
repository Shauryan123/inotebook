import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/Notes/noteContext";
import './signup.css';

export default function Signup() {
  const context = useContext(NoteContext);
  const { showAlert, alert } = context;

  const [credentials, setCredentials] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    profileImg: "",
    designation: ""
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (document.querySelector("#cpassword").value !== document.querySelector('#password').value) {
      showAlert("Confirm Password and Password Fields do not Match!", "danger");
      return;
    }

    const url = 'http://localhost:5000/api/auth/createuser';
    const { title, firstName, lastName, email, password, profileImg, designation } = credentials;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        firstName,
        lastName,
        email,
        password,
        profileImg,
        designation
      })
    });

    const json = await response.json();

    if (json.success === true) {
      localStorage.setItem("token", json.authToken);
      navigate('/');
      showAlert("Account Created Successfully!", "success");
    } else {
      showAlert("Invalid Credentials!", "danger");
    }
  }

  return (
    <div className="background-image3">
      <div className="d-flex justify-content-center align-items-center vh-100 mt-1">
      <div className="rounded p-4">
        {/* <h2 className="text-center mb-1 text-white">Create an Account to continue to ESG Portal</h2> */}
        <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label htmlFor="title" className="form-label text-white">Title</label>
          <input type="text" className="form-control" name="title" id="title" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="firstName" className="form-label text-white">First Name</label>
          <input type="text" className="form-control" name="firstName" id="firstName" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="lastName" className="form-label text-white">Last Name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label text-white">Email address</label>
          <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-1">
          <label htmlFor="profileImg" className="form-label text-white">Profile Image Link</label>
          <input type="text" className="form-control" name="profileImg" id="profileImg" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="designation" className="form-label text-white">Designation</label>
          <input type="text" className="form-control" name="designation" id="designation" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="cpassword" className="form-label text-white">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} />
        </div>
        <div>
        <button type="submit" className="btn btn-primary my-3">Submit</button>
        </div>
        </form>
      </div>
    </div>
    </div>


  )
}
