import noteContext from `./noteContext`;
import React, {useState} from "react";

const noteState = (props) => {
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async() => {
        const response = await fetch(`api/notes/fetchAllEntries`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "auth-token":       localStorage.getItem('token'),
            },
        });

        const json = await response.json();
        setNotes(json);
    };

    //Post Note
    const addNote = async(title, description, tag) => {
        const response = await fetch(`api/notes/addEntries`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, tag}),
        });

        const json = await response.json();
        setNotes(notes.concat(json));
    };

    const deleteNote = async(id) => {
        const response = await fetch(`api/notes/deleteEntry/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });

        const json = await response.json();
        console.log(json);
        console.log(`Deleting notes button` + id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });

        setNotes(newNotes);
    };

    const editNote = async(id, title, description, tag) => {
        const response = await fetch(`/api/notes/updateEntry/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        console.log(json);
        
        let newNote = JSON.parse(JSON.stringify(notes));
        for (var index = 0; index < newNote.length; index++)
        {
            const element = newNote[index];
            if (element._id === id)
            {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }

        setNotes(newNote);
    };

    return (
        <>
        <noteContext.Provider
        value=({notes, addNote, deleteNote, editNote, getNotes })
        >
        {props.children}
        </noteContext.Provider>
        </>
    );
};


export default noteState;
