import React, { useState } from 'react';
import { Menu, X, Search, Bell, User,LogOut } from 'lucide-react';
import styles from '../../styles/header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/home", text: "Home" },
    { href: "/meu-perfil", text: "Meu perfil" },
    { href: "/explorar", text: "Explorar" },
    { href: "/comunidade", text: "Comunidade" },
  ];

  const handleLogout = () => {
    // Implementar a lógica real de logout aqui
  };

  return (
    <header className={styles.header}>
       {/* Menu Desktop */}
       
      <div className={styles.container}>
        <nav className={styles.nav}>

          {/* Seção Logo */}
          <div className={styles.leftSection}>
            <a href="/" className={styles.logo}>Logo</a>
            
            {/* Links */}
            <div className={styles.desktopMenu}>
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={styles.menuLink}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Busca */}
          <div className={styles.rightSection}>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Buscar amigos..."
                className={styles.searchInput}
              />
              <Search size={18} className={styles.searchIcon} />
            </div>

            {/* Ícones */}


            {/* Ícone notificações */}
            <button className={styles.iconButton} aria-label="Notifications">
              <Bell size={22} />
            </button>

            {/* Ícone perfil */}
            <button className={styles.iconButton} aria-label="Profile">
              <User size={22} />
            </button>

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
            <input 
              type="text" 
              placeholder="Buscar amigos..."
              className={styles.mobileSearchInput}
            />

            {/* Links */}
            {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className={styles.menuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
          </div>
        )}
      </div>
    </header>
  );
}