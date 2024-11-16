import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Projects from "./components/projects/Projects";

function App() {
  return (
    <AuthProvider>
      <Projects />
    </AuthProvider>
  );
}

export default App;
