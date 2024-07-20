import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Workspace from './pages/Workspace';


function App() {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signIn' element={<SignIn setCurrentUser={setCurrentUser} />} />
          <Route path='/signUp' element={<SignUp setCurrentUser={setCurrentUser} />} />
          <Route path='/' element={<LandingPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
