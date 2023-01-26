import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const { addNote } = context;
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title , note.description , note.tag);
        setNote({ title: "", description: "", tag: "" })
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return(
        <div>
            
        </div>
    );
};

export default AddNote;