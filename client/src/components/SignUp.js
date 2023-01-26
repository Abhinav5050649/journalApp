import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

//Need to implement

export const SignUp = () => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

    const handleSubmit = async(e) => {
        console.log(`Clicked`);
        e.preventDefault();
        const response = await fetch(`api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
        });
        const json = await response.json()
        console.log(json)

        localStorage.setItem(`token`, json.authToken)
        history(`/login`)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div> 
              <form onSubmit={handleSubmit} method="post"> 
                    <div className="form-group">
                        <label>Name</label>
                        <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="textFormControlInput1" required={true}></input>
                    </div>      
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="textFormControlInput1" required={true}></input>
                    </div>                     
                    <button type="submit" className="btn btn-primary">Submit</button>
             </form>
        </div>
    );
};

export default SignUp;