import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css' 
import Login from './pages/signin'
import SignUp from './pages/signup'
import Home from './pages/Home';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  
  return (
    //Usando Router para lidar com os redirecionamentos de página
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Se está autenticado vai para Home, senão vai para tela login */} 
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />

        {/* Rota fallback caso nenhum path bata */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
