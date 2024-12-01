import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "../auth/AuthContext";
import "./App.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <Provider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  );
}

export default App;
