import { useState, useEffect } from "react";
import HeaderComponent from "../components/header/header";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";
import styles from "../styles/profile.module.css";

export default function Profile({ setIsAuthenticated }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Buscar dados do usuário
    // Por enquanto, dados mock
    setUserData({
      nome: "Cebolinha",
      email: "cebolinha@turmadamonica.com",
      username: "littleOnion",
    });
  }, []);

  return (
    <>
      <HeaderComponent setIsAuthenticated={setIsAuthenticated} />
      <div className={styles.container}>
        <ProfileSidebar userData={userData} />
        <ProfileForm userData={userData} />
      </div>
    </>
  );
}