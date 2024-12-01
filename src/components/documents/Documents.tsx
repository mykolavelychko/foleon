import { EmptyState } from "@/components/ui/empty-state";
import ErrorState from "@/shared/ErrorState";
import { FilterByCategory, FilterByCategoryType } from "@/shared/filter-by-category/FilterByCategory";
import { FilterByName, FilterByNameType } from "@/shared/filter-by-name/FilterByName";
import { Box, Heading, SimpleGrid, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBookX } from "react-icons/lu";
import { useAuth } from "../../auth/AuthContext";
import DataTile from "../../shared/data-tile/DataTile";
import Pagination from "../paginator/Paginator";
import { useDocs } from "./Documents.hooks";

// TODO: add "Project" filter
// TODO: save filters in the URL
function Documents() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [nameFilter, setNameFilter] = useState<FilterByNameType | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<FilterByCategoryType | null>();
  const [filters, setFilters] = useState<(FilterByNameType | FilterByCategoryType)[]>([]);

  const { data, loading, error } = useDocs(page, filters, isAuthenticated);

  const docs = data?._embedded.edition;
  const total = data?.total;

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const filters = [];
    if (nameFilter) {
      filters.push(nameFilter);
    }
    if (categoryFilter) {
      filters.push(categoryFilter);
    }
    setPage(1);
    setFilters(filters);
  }, [nameFilter, categoryFilter]);

  if (error) {
    return <ErrorState>{error}</ErrorState>;
  }

  return (
    <Box p={[6, 8]}>
      <Heading as="h1">Foleon Documents</Heading>
      <Box p={[2, 4]}></Box>
      <SimpleGrid columns={[1, 2]} gap="30px">
        <FilterByName onFilterChange={setNameFilter} />
        <FilterByCategory onFilterChange={setCategoryFilter} />
      </SimpleGrid>
      <Box p={[2, 4]}></Box>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" role="status" />
        </Box>
      )}
      {!loading && (
        <>
          {isMobile && (
            <>
              <Pagination currentPage={page} total={total} onPageChange={setPage} />
              <Box p="2"></Box>
            </>
          )}
          <SimpleGrid columns={[1, null, 2, null, 4]} gap="30px">
            {docs?.map((doc) => (
              <DataTile data={doc} key={doc.id} />
            ))}
          </SimpleGrid>
          <Box p="4"></Box>
          {!isMobile && <Pagination currentPage={page} total={total} onPageChange={setPage} />}

          {docs?.length === 0 && (
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

export default Documents;
