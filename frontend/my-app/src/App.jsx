import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css' 
import Login from './pages/signin'
import SignUp from './pages/signup'
import Home from './pages/Home';
import Comunidades from './pages/comunidades'
import TelaPosts from './pages/post_comunidade'
import Header from './components/header/header'
import { useAuth } from './context/AuthContext'
import RotaProtegida from './routes/RotaProtegida';

function App() {
  const {setIsAuthenticated} = useAuth();
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

        {/* Rota para página comunidade */}
        <Route path="/comunidades" element={
            <RotaProtegida>
              <>
                  {HeaderPadrao}
                  <Comunidades />
              </>
            </RotaProtegida>
        } />

        {/* Rota para posts, id é o número de identificação da comunidade */}
        <Route path="/comunidade/:id" element={
            <RotaProtegida>
              <>
                  {HeaderPadrao}
                  <TelaPosts />
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
