import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/Notes/noteContext";

export default function Login() {

    const context = useContext(noteContext);
    const {notes, setNotes, addNote, showAlert, alert, getUser} = context;

    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    });

    let navigate = useNavigate();


   const onChange = (e) => {

    setCredentials({... credentials, [e.target.name] : e.target.value});

   }



    const handleSubmit = async (e) => {

        e.preventDefault();

        const url = 'http://localhost:5000/api/auth/login';
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YzQyOWQ4YWY5YjJhOGEyNmU3Y2RlIn0sImlhdCI6MTY4NDgyMTk1N30.RheXv8kuTMVAh_4OfAF5iX5amM7TosxiGN0ltiDr_5M"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // body data type must match "Content-Type" header
          body: JSON.stringify({email : credentials.email, password : credentials.password})
        });

        const json = await response.json();


        console.log(json);

        if (json.success === true) {

            //Save the auth token in local storage and redirect

            localStorage.setItem("token", json.authToken);
            showAlert(" Logged in successfully!", "success")
            navigate('/');
            getUser();
        } else {

            showAlert(" Invalid Credentials!", "danger");
        }


    }
  return (
    <div className='mt-3'>
        <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" value ={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" value={credentials.password}  onChange={onChange} id="password" name='password'/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
