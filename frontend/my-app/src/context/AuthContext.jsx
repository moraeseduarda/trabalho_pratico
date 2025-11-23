import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const URL_BACKEND =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://trabalho-pratico-fgqh.onrender.com";

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verifica se existe cookie no backend
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch(`${URL_BACKEND}/api/users/home`, {
                  credentials: "include"  
                });
                setIsAuthenticated(res.ok);
            } catch {
                setIsAuthenticated(false);
            }
        }
        checkAuth(); 
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}