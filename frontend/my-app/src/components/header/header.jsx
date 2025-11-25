import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/header.module.css';
import { Link } from "react-router-dom"
import logo from '../../assets/images/bookbox-logo.png';

export default function Header({setIsAuthenticated}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/meu-perfil", text: "Meu perfil" },
    { href: "/explorar", text: "Minha Biblioteca" },
    { href: "/comunidades", text: "Comunidades" },
    { href: "/livros", text: "Adicionar livros" },
  ];

  const URL_BACKEND =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  const handleLogout = async () => {
      try {
        const res = await fetch(`${URL_BACKEND}/api/users/logout`, {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(false);
          navigate('/signin');
        } else {
          console.error('Logout falhou');
        }
      } catch (error) {
        console.error('Erro ao chamar logout:', error);
      }

  };

  const handleProfileClick = () => {
    navigate('/meu-perfil');
  }

  return (
    <header className={styles.header}>
       {/* Menu Desktop */}
       
      <div className={styles.container}>
        <nav className={styles.nav}>

          {/* Seção Logo */}
          <div className={styles.leftSection}>
            {/* <p className={styles.logo}>Logo</p> */}
            <Link to="/" className={styles.logoLink}>
              <img src={logo} alt="BookBox" className={styles.logoImage} />
            </Link>
            
            {/* Links */}
            <div className={styles.desktopMenu}>
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={styles.menuLink}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.rightSection}>

            {/* Ícone perfil */}
            <button className={styles.iconButton} onClick={handleProfileClick} aria-label="Profile">
              <User size={22} />
            </button>

            {/* Botão logout*/}
            <button 
              className={`${styles.iconButton} ${styles.logoutButton}`} 
              onClick={handleLogout}
              aria-label="Sair da conta"
            >
              <LogOut size={22} />
            </button>

            {/* Botão menu mobile */}
            <button 
              className={`${styles.iconButton} ${styles.mobileMenuButton}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Menu Mobile */}

        {mobileMenuOpen && (
          <div className={styles.mobileMenu} id="mobile-nav-menu">

            {/* Links */}
            {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className={styles.menuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
          </div>
        )}
      </div>
    </header>
  );
}