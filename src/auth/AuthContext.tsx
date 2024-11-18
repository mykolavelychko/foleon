import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoginDialog from "@/components/LoginDialog";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      // FIXME: fails with 403 for both /self and /self/privilege
      // validateToken(storedToken);
      setToken(storedToken);
    } else {
      initiateLogin();
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          initiateLogin();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    if (!token) return;
    sessionStorage.setItem("authToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
  }, [token]);

  const initiateLogin = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setIsLoginOpen(true);
  };

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get("https://api.foleon.com/self", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setToken(token);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Token validation failed", error);
      initiateLogin();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setToken }}>
      {children}
      <LoginDialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
