import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Login from './pages/signin'
import SignUp from './pages/signup'
import Home from './pages/Home'
import AddLivros from './pages/addLivros'
import Profile from './pages/Profile';
import Comunidades from './pages/comunidades'
import TelaComunidade from './pages/area_comunidade'
import Header from './components/header/header'
import { useAuth } from './context/AuthContext'
import RotaProtegida from './routes/RotaProtegida';
import PostComunidade from './components/post_comunidade';
import BibliotecaUser from './pages/bibliotecaUser';
import GerenciarComunidade from './pages/GerenciarComunidade' 

function App() {
  const {setIsAuthenticated, isAuthenticated} = useAuth();
  const HeaderPadrao = <Header setIsAuthenticated={setIsAuthenticated} />;

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/signin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><Home /></> : <Navigate to="/signin" />}
        />
        <Route
          path="/comunidades"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><Comunidades /></> : <Navigate to="/signin" />}
        />
        <Route
          path="/comunidade/:id"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><TelaComunidade /></> : <Navigate to="/signin" />}
        />
        {/* ADICIONE ESTA ROTA */}
        <Route
          path="/comunidade/:id/gerenciar"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><GerenciarComunidade /></> : <Navigate to="/signin" />}
        />
        <Route
          path="/comunidade/:id/post/:postId"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><PostComunidade /></> : <Navigate to="/signin" />}
        />
        <Route
          path="/meu-perfil"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><Profile setIsAuthenticated={setIsAuthenticated} /></> : <Navigate to="/signin" />}
        />
        <Route
          path="/livros"
          element={isAuthenticated ? <><Header setIsAuthenticated={setIsAuthenticated} /><AddLivros /></> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  )
}

export default App;
