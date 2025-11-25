import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import BibliotecaUser from './pages/bibliotecaUser'; // Importe a nova página

function App() {
  const {setIsAuthenticated, isAuthenticated} = useAuth();
  const HeaderPadrao = <Header setIsAuthenticated={setIsAuthenticated} />;

  return (
    //Usando Router para lidar com os redirecionamentos de página
    <BrowserRouter>
      <Routes>
        {/* Rotas sem header */}
        <Route path="/signin" element={<Login setIsAuthenticated={setIsAuthenticated}  />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rotas com header */}

          {/* Se está autenticado vai para Home, senão vai para tela login */} 
          <Route path="/" element={
            <RotaProtegida>
                <>
                    {HeaderPadrao}
                    <Home />
                </>
            </RotaProtegida>
        } />

          
          {/* Rota para meu perfil */}
          <Route path="/meu-perfil" element={
            <RotaProtegida>
                <>
                    {HeaderPadrao}
                    <Profile />
                </>
            </RotaProtegida>
        } />

        {/* Rota para página comunidade */}
        <Route path="/comunidades" element={
            <RotaProtegida>
              <>
                  {HeaderPadrao}
                  <Comunidades />
              </>
            </RotaProtegida>
        } />

        {/* Rota para página individual da comunidade, id é o número de identificação da comunidade */}
        <Route path="/comunidade/:id" element={
            <RotaProtegida>
              <>
                {HeaderPadrao}
                <TelaComunidade />
              </>
            </RotaProtegida>
        } />

        {/* Rota para post individual de uma comunidade*/}
        <Route path="/comunidade/:id/post/:postId" element={
          <RotaProtegida>
            <>
              {HeaderPadrao}
              <PostComunidade />
            </>
          </RotaProtegida>
        } />


        {/* Rota para adicionar livros*/}
        <Route path="/livros" element={
          <RotaProtegida>
            <>
              {HeaderPadrao}
              <AddLivros />
            </>
          </RotaProtegida>
        } />

        {/* NOVA ROTA: Biblioteca do Usuário */}
        <Route path="/explorar" element={
          <RotaProtegida>
            <>
              {HeaderPadrao}
              <BibliotecaUser />
            </>
          </RotaProtegida>
        } />

        {/* Rota fallback caso nenhum path bata */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
