import React , {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/Notes/noteContext";

export default function Signup() {

    const context = useContext(NoteContext);
    const {notes, setNotes, addNote, showAlert, alert} = context;

    const [credentials, setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });

    let navigate = useNavigate();


   const onChange = (e) => {


    setCredentials({... credentials, [e.target.name] : e.target.value});

   }



    const handleSubmit = async (e) => {


        e.preventDefault();

        if (document.querySelector("#cpassword").value !== document.querySelector('#password').value) {


            console.log(document.querySelector("#cpassword"));
            console.log(document.querySelector("#password"));
            showAlert("Confirm Password and Password Fields do not Match!","danger");

            return 0;

        }



        const url = 'http://localhost:5000/api/auth/createuser';
        const {name, email, password} = credentials;
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // body data type must match "Content-Type" header
          body: JSON.stringify({name: name,email : email, password : password})
        });

        const json = await response.json();


        console.log(json);

        if (json.success === true) {

            //Save the auth token in local storage and redirect

            localStorage.setItem("token", json.authToken);
            navigate('/');
            showAlert(" Account Created Successfully!", "success");
        } else {

            // alert("Invalid Credentials!");
            showAlert(" Invalid Credentials!", "danger");
        }


    }
  return (
    <div className='container mt-2'>
        <h2>Create an Account to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name ="email" id="email" aria-describedby="emailHelp"  onChange={onChange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" name="name" id="name"  onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" id="password" onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" name="cpassword" id="cpassword" onChange={onChange}/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
