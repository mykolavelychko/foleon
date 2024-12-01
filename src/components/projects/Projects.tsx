import { EmptyState } from "@/components/ui/empty-state";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuBookX } from "react-icons/lu";
import { useAuth } from "../../auth/AuthContext";
import Pagination from "../paginator/Paginator";
import { useProjects } from "./Projects.hooks";
import DataTile from "../../shared/data-tile/DataTile";
import ErrorState from "@/shared/ErrorState";

function Projects() {
  const { isAuthenticated } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState([]);

  const { data, loading, error } = useProjects(page, filters, isAuthenticated);

  const projects = data?._embedded.title;
  const total = data?.total;

  if (error) {
    return <ErrorState>{error}</ErrorState>;
  }

  return (
    <Box p={[6, 8]}>
      <Heading as="h1">Foleon Projects</Heading>
      <Box p={[2, 4]}></Box>
      <Box p={[2, 4]}></Box>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Spinner size="xl" role="status" />
        </Box>
      )}
      {!loading && (
        <>
          {isMobile && (
            <>
              <Pagination
                currentPage={page}
                total={total}
                onPageChange={setPage}
              />
              <Box p="2"></Box>
            </>
          )}
          <SimpleGrid columns={[1, null, 2, null, 4]} gap="30px">
            {projects?.map((project) => (
              <DataTile data={project} key={project.id} />
            ))}
          </SimpleGrid>
          <Box p="4"></Box>
          {!isMobile && (
            <Pagination
              currentPage={page}
              total={total}
              onPageChange={setPage}
            />
          )}

          {projects?.length === 0 && (
            <EmptyState
              icon={<LuBookX />}
              title="Your filter gives no results"
              description="Try to adjust your filter criteria"
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Projects;
