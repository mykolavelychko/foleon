import { EmptyState } from "@/components/ui/empty-state";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import ErrorState from "@/shared/ErrorState";
import {
  Box,
  createListCollection,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBookX } from "react-icons/lu";
import { useAuth } from "../../auth/AuthContext";
import DataTile from "../../shared/data-tile/DataTile";
import Pagination from "../paginator/Paginator";
import { useDocs } from "./Documents.hooks";

const categories = createListCollection({
  items: [
    { label: "All Categories", value: "" },
    { label: "Annual Report", value: "annual_report" },
    { label: "Branded content", value: "branded_content" },
    { label: "Brochure", value: "brochure" },
    { label: "Case study", value: "case_study" },
    { label: "Customer magazine", value: "customer_magazine" },
    { label: "eBook", value: "ebook" },
    { label: "Event Magazine", value: "event_magazine" },
    { label: "Manual", value: "manual" },
    { label: "Member magazine", value: "member_magazine" },
    { label: "Newsletter", value: "newsletter" },
    { label: "Pitch document", value: "pitch_deck" },
    { label: "Presentation", value: "presentation" },
    { label: "Proposal", value: "proposal" },
    { label: "Product catalog", value: "product_catalog" },
    { label: "Report", value: "report" },
    { label: "Staff magazine", value: "staff_magazine" },
    { label: "White paper", value: "whitepaper" },
    { label: "Other", value: "other" },
  ],
});

function Documents() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [debouncedNameFilter, setDebouncedNameFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>();
  const [filters, setFilters] = useState([]);

  const { data, loading, error } = useDocs(page, filters, isAuthenticated);

  const docs = data?._embedded.edition;
  const total = data?.total;

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameFilter]);

  useEffect(() => {
    const filters = [];
    if (debouncedNameFilter) {
      filters.push({
        field: "name",
        type: "like",
        value: debouncedNameFilter,
      });
    }
    if (categoryFilter?.[0]) {
      filters.push({
        field: "category",
        type: "eq",
        value: categoryFilter[0],
      });
    }
    setPage(1);
    setFilters(filters);
  }, [debouncedNameFilter, categoryFilter]);

  const onNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  if (error) {
    return <ErrorState>{error}</ErrorState>;
  }

  return (
    <Box p={[6, 8]}>
      <Heading as="h1">Foleon Documents</Heading>
      <Box p={[2, 4]}></Box>
      <SimpleGrid columns={[1, 2]} gap="30px">
        <Field label="Name">
          <Input
            variant="subtle"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={onNameFilterChange}
          />
        </Field>
        <SelectRoot
          variant="subtle"
          collection={categories}
          value={categoryFilter}
          onValueChange={(e) => setCategoryFilter(e.value)}
        >
          <SelectLabel>Category</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.items.map((category) => (
              <SelectItem item={category} key={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </SimpleGrid>
      <Box p={[2, 4]}></Box>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
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
            {docs?.map((doc) => (
              <DataTile data={doc} key={doc.id} />
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
