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
import Pagination from "../paginator/Paginator";
import { useDocs } from "./Documents.hooks";
import DocumentTile from "./DocumentTile";

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
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [nameFilterValue, setNameFilterValue] = useState<string>("");
  const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>();
  const [debouncedFilter, setDebouncedFilter] = useState<any[]>([]);
  const orderBy = "name";

  const {
    data,
    loading: projectsLoading,
    error,
  } = useDocs(page, debouncedFilter, orderBy, isAuthenticated);

  const docs = data?._embedded.edition;
  const total = data?.total;

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const handler = setTimeout(() => {
      const filters = [];
      if (nameFilterValue) {
        filters.push({
          field: "name",
          type: "like",
          value: nameFilterValue,
        });
      }
      if (categoryFilterValue?.[0]) {
        filters.push({
          field: "category",
          type: "eq",
          value: categoryFilterValue[0],
        });
      }
      setPage(1);
      setDebouncedFilter(filters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameFilterValue, categoryFilterValue]);

  const onNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilterValue(event.target.value);
  };

  if (authLoading || projectsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            value={nameFilterValue}
            onChange={onNameFilterChange}
          />
        </Field>
        <SelectRoot
          variant="subtle"
          collection={categories}
          value={categoryFilterValue}
          onValueChange={(e) => setCategoryFilterValue(e.value)}
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
      {isMobile && (
        <>
          <Pagination currentPage={page} total={total} onPageChange={setPage} />
          <Box p="2"></Box>
        </>
      )}
      {docs.length === 0 && (
        <EmptyState
          icon={<LuBookX />}
          title="Your filter gives no results"
          description="Try to adjust your filter criteria"
        />
      )}

      <SimpleGrid columns={[1, null, 2, null, 4]} gap="30px">
        {docs?.map((doc) => (
          <DocumentTile doc={doc} key={doc.id} />
        ))}
      </SimpleGrid>
      <Box p="4"></Box>
      {!isMobile && (
        <Pagination currentPage={page} total={total} onPageChange={setPage} />
      )}
    </Box>
  );
}

export default Documents;
