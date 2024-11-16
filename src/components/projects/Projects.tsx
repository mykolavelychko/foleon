import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useProjects } from "./Projects.hooks";
import Pagination from "../paginator/Paginator";

function Projects() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const filter = "";
  const orderBy = "name";

  const {
    data,
    loading: projectsLoading,
    error,
  } = useProjects(page, limit, filter, orderBy, isAuthenticated);

  const projects = data?._embedded.title;
  const totalPages = data?.page_count;

  if (authLoading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects?.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default Projects;
