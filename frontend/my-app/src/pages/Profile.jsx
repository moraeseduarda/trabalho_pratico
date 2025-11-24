import { useState, useEffect } from "react";
import HeaderComponent from "../components/header/header";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";
import styles from "../styles/profile.module.css";

export default function Profile({ setIsAuthenticated }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-z409.onrender.com";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${URL_BACKEND}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setIsAuthenticated, URL_BACKEND]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await fetch(`${URL_BACKEND}/api/users/profile`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      const data = await response.json();
      setUserData(data.user);
      return { success: true, message: "Perfil atualizado com sucesso!" };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { 
        success: false, 
        message: error.message || "Erro ao atualizar perfil."
      };
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <HeaderComponent setIsAuthenticated={setIsAuthenticated} />
      <div className={styles.container}>
        <ProfileSidebar userData={userData} />
        <ProfileForm userData={userData} onUpdate={handleUpdateProfile} />
      </div>
    </>
  );
}