import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props)=>{

  const host = "http://localhost:5000";
  const [noteCount, setNoteCount] = useState(0);

  // useEffect(() => {
  //   getUser(); // Call getUser when NoteState is mounted
  // }, []);
    const notesInitial = [
        {
          "_id": "61322f195153781a8ca8d0e06",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.509Z",
          "__v": 0
        },
        {
          "_id": "61322f195531781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f19553781a8ca8d0e081",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f19553781a8ca8d0e082",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f195537812a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "613222f19553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f119553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
      ]
      const notesInitial1 =[];
      const [notes, setNotes] = useState(notesInitial1);
      const [alert, setAlert] = useState(null);
      const [user, setUser] = useState(null);

      const showAlert = (message, type) => {

        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {setAlert(null)}, 3000);

    }

    const getUser = async () => {
      // API Call
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setUser(json);
      return json;

    }

      const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json);
      }


      // Add a Note
      const addNote = async (title, description, tag)=>{
        // TODO: API Call

        const url = `${host}/api/notes/addNote`;
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
      const json = await response.json();
        console.log("Adding a new note")
        // const note = {
        //   "_id": "61322f119553781a8ca8d0e08",
        //   "user": "6131dc5e3e4037cd4734a0664",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2021-09-03T14:20:09.668Z",
        //   "__v": 0
        // };
        setNotes(notes.concat(json));
      }

      // Delete a Note
      const deleteNote = async (id)=>{

        // TODO: API Call
        const url = `${host}/api/notes/deleteNote/${id}`;
        const response = await fetch(url, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // body data type must match "Content-Type" header
        });
      const json = await response.json();
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        showAlert(" Note has been Deleted!!", "success")
      }
      // Edit a Note
      // const editNote = async (id, title, description, tag)=>{

      //   const url = `${host}/api/notes/updateNote/${id}`;
      //   const response = await fetch(url, {
      //     method: "PUT", // *GET, POST, PUT, DELETE, etc.
      //     headers: {
      //       "Content-Type": "application/json",
      //       "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YzQyOWQ4YWY5YjJhOGEyNmU3Y2RlIn0sImlhdCI6MTY4NDgyMTk1N30.RheXv8kuTMVAh_4OfAF5iX5amM7TosxiGN0ltiDr_5M"
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //     body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      //   });
      // const json = response.json(); // parses JSON response into native JavaScript objects


      //   for (let index = 0; index < notes.length; index++) {
      //     const element = notes[index];

      //     if (element._id === id) {
      //       element.title = title;
      //       element.description = description;
      //       element.tag = tag;
      //     }

      //   }

      // }

      const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json)

         let newNotes = JSON.parse(JSON.stringify(notes))
         //for generating a copy of the note...becaues in react we cannot update or change a state in the usual way or like a vairbale
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote, editNote, getNotes, alert, showAlert,user, getUser, noteCount}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;