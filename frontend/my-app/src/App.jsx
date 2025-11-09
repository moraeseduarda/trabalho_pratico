import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css' 
import Login from './pages/signin'
import SignUp from './pages/signup'


function App() {
  return (
    //Usando Router para lidar com os redirecionamentos de página
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
