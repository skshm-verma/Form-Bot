import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Workspace from './pages/Workspace';
import SettingsUpdate from './pages/SettingsUpdate';


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
          <Route path="/workspace/settings" element={<SettingsUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
