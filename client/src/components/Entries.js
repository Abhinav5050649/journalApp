import React, {useContext, useState, useRef, useEffect} from "react";
import noteContext from "../context/notes/noteContext";
import {AddNote} from "./addNote";
import {entryItem} from "./entryItem";

//Need to implement

export const Entries = () => {
    const context = useontext(noteContext);
    const {notes, getNotes, editNote} = context;

    useEffect(() => {
        getNotes();
    }, []);

    const [note, setNote] = useState({varId: "", varTitle: "", varDescription: ""});

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({varId: currentNote._id, varTitle: currentNote.title, varDescription: currentNote.description})
    };

    const handleClick = (e) => {
        editNote(note.varId, note.varTitle, note.varDescription)
        e.preventDefault()
        refClose.current.click()
    };

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    };

    //Check this out
    return (
        <>

        </>
    )
};

export default Entries;