import { useState, useEffect } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";
import styles from "../styles/profile.module.css";

export default function Profile({ setIsAuthenticated }) {
  const [userData, setUserData] = useState(null);
  const [biblioteca, setBiblioteca] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados do usuário
        const userResponse = await fetch(`${URL_BACKEND}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error('Erro ao buscar perfil');
        }

        const userData = await userResponse.json();
        setUserData(userData);

        // Buscar biblioteca
        const bibliotecaResponse = await fetch(`${URL_BACKEND}/api/users/biblioteca`, {
          method: "GET",
          credentials: "include",
        });

        if (bibliotecaResponse.ok) {
          const bibliotecaData = await bibliotecaResponse.json();
          setBiblioteca(bibliotecaData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <>
      <div className={styles.container}>
        <ProfileSidebar userData={userData} biblioteca={biblioteca} />
        <ProfileForm userData={userData} onUpdate={handleUpdateProfile} />
      </div>
    </>
  );
}