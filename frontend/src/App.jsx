import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';

function App() {
      const [currentUser , setCurrentUser] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn setCurrentUser={setCurrentUser} />} />
          <Route path='/signup' element={<SignUp setCurrentUser={setCurrentUser} />} />
          <Route path='/' element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
