import Documents from "@/components/documents/Documents";
import NotFound from "@/components/NotFound";
import Projects from "@/components/projects/Projects";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Documents />} />
          <Route path="documents" element={<Documents />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
