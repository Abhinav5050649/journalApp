import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: ""});
    const { addNote } = context;
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description);
        setNote({ title: "", description: ""})
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return(
        <div>
            <form> 
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" minLength={5} value={note.title} onChange={onChange} id="textFormControlInput1" required={true}></input>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" value={note.description} name="description" minLength={5} onChange={onChange} id="textFormControlInput1"  required={true}></input>
                </div>
                
                <button type="submit" 
                disabled = {note.title.length <5 || note.description.length <5} className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
};

export default AddNote;