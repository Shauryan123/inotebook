import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/Notes/noteContext';
import './Login.css';

export default function Login() {
  const context = useContext(noteContext);
  const { notes, setNotes, addNote, showAlert, alert, getUser } = context;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/api/auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (json.success === true) {
      localStorage.setItem('token', json.authToken);
      showAlert('Logged in successfully!', 'success');
      getUser();
      navigate('/dashboard');

    } else {
      showAlert('Invalid Credentials!', 'danger');
    }
  };

  return (
    <div className="background-image">
      <div className="login-page">
      <div className="login-form-container">
        <img src="https://back.3blmedia.com/sites/default/files/inline-images/Cintas_ESG_Logo_Color.jpeg" style={{width:'150px', height:'100px', margin:'45px'}} alt="" />
        <h2>Sign in to your account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{color:'black'}}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{color:'black'}}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
            />
          </div>
          <Link className= "s" to="/resetpassword">Reset Password</Link><br/><br/>
          No account ?  <Link className= "s" to="/signup">Create a account</Link>
          <button type="submit" className="btn btn-primary mx-3"style={{backgroundColor: '#213555', width:'10rem'}}>
            SIGN IN
          </button>
        </form>
      </div>

    </div>
    </div>

  );
}
