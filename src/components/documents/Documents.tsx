import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useDocs } from "./Documents.hooks";
import Pagination from "../paginator/Paginator";
import { createListCollection, Input } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const categories = createListCollection({
  items: [
    { label: "All Categories", value: "" },
    { label: "Annual Report", value: "annual_report" },
    { label: "All Categories", value: "branded_content" },
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
      <h1>Foleon Docs</h1>
      <Input
        placeholder="Filter by name"
        value={nameFilterValue}
        onChange={onNameFilterChange}
      />

      <SelectRoot
        collection={categories}
        value={categoryFilterValue}
        onValueChange={(e) => setCategoryFilterValue(e.value)}
      >
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

      <ul>
        {docs?.map((doc) => (
          <li key={doc.id}>{doc.name}</li>
        ))}
      </ul>
      <Pagination currentPage={page} total={total} onPageChange={setPage} />
    </div>
  );
}

export default Documents;
