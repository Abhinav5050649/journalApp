import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export const Login = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async(e) => {
        console.log(`Clicked`)
        e.preventDefault();

        const response = await axios.post(`api/auth/login`, {
            email: credentials.email,
            password: credentials.password
        });

        const json = await response.json()
        console.log(json)
        if (json.success){
            localStorage.setItem(`token`, json.authToken)
            navigate(`/`)
        }else{
            alert(`Invalid Type`)
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="textFormControlInput1" required={true}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="pasword" className="form-control" value={credentials.password} onChange={onChange} id="textFormControlInput1"  required={true}></input>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}


export default Login;