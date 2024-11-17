import { Provider } from "@/components/ui/provider";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Documents from "./components/documents/Documents";

function App() {
  return (
    <Provider>
      <AuthProvider>
        <Documents />
      </AuthProvider>
    </Provider>
  );
}

export default App;
