import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Documents from "./components/documents/Documents";

function App() {
  return (
    <AuthProvider>
      <Documents />
    </AuthProvider>
  );
}

export default App;
