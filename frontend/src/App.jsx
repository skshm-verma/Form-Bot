import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import ContextProvider from './context/AllContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Workspace from './pages/Workspace';
import SettingsUpdate from './pages/SettingsUpdate';
import NewFormPage from './pages/NewFormPage';
import PublishForm from './pages/PublishForm';
import SelectThemePage from './pages/SelectThemePage';
import ResponsePage from './pages/ResponsePage';
import './App.css'


function App() {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signIn' element={<SignIn setCurrentUser={setCurrentUser} />} />
            <Route path='/signUp' element={<SignUp setCurrentUser={setCurrentUser} />} />
            <Route path='/' element={<LandingPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/workspace/settings" element={<SettingsUpdate />} />
            <Route path="/workspace/newForm" element={< NewFormPage />} />
            <Route path="/workspace/selectTheme" element={< SelectThemePage />} />
            <Route path="/workspace/formResponse" element={< ResponsePage />} />
            <Route path='/submitForm' element={<PublishForm />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  )
}

export default App
