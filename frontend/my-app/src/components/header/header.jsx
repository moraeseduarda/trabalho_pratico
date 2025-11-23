import { useState } from 'react';
import { Menu, X, Search, Bell, User,LogOut } from 'lucide-react';
import styles from '../../styles/header.module.css';
import { Link } from "react-router-dom"

export default function Header({setIsAuthenticated}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/home", text: "Home" },
    { href: "/meu-perfil", text: "Meu perfil" },
    { href: "/explorar", text: "Explorar" },
    { href: "/comunidades", text: "Comunidades" },
  ];

  const URL_BACKEND =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  const handleLogout = async () => {
    await fetch(`${URL_BACKEND}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);

  };

  return (
    <header className={styles.header}>
       {/* Menu Desktop */}
       
      <div className={styles.container}>
        <nav className={styles.nav}>

          {/* Seção Logo */}
          <div className={styles.leftSection}>
            <p className={styles.logo}>Logo</p>
            
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

          {/* Busca */}
          <div className={styles.rightSection}>
            {/*
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Buscar amigos..."
                className={styles.searchInput}
              />
              <Search size={18} className={styles.searchIcon} />
            </div> 
            */}

            {/* Ícones */}


            {/* Ícone notificações */}

            {/*
            <button className={styles.iconButton} aria-label="Notifications">
              <Bell size={22} />
            </button>
            */}

            {/* Ícone perfil */}
            <button className={styles.iconButton} aria-label="Profile">
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
            {/* Busca */}
            {/*
            <input 
              type="text" 
              placeholder="Buscar amigos..."
              className={styles.mobileSearchInput}
            />
            */}

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