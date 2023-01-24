import './App.css';
import React from 'react';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import noteState from './context/notes/noteState';
import {Alert} from './components/Alert';
import {Login} from './components/Login';
import {SignUp} from './components/SignUp';

function App() {
  return (
    <>
      <noteState>
        <Router>
          <Navbar/>
          <Alert/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home key="home" />}/>
              <Route path="/about" element={<About key="about" />}/>
              <Route path="/login" element={<Login key="login" />}/>
              <Route path="/signup" element={<SignUp key="signup"/>}/> 
            </Routes>
          </div>
        </Router>
      </noteState>
    </>
  );
}

export default App;
