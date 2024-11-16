import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useDocs } from "./Documents.hooks";
import Pagination from "../paginator/Paginator";

function Documents() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [nameFilterValue, setNameFilterValue] = useState<string>("");
  const [categoryFilterValue, setCategoryFilterValue] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<any[]>([]);
  const limit = 10;
  const orderBy = "name";

  const {
    data,
    loading: projectsLoading,
    error,
  } = useDocs(page, limit, debouncedFilter, orderBy, isAuthenticated);

  const docs = data?._embedded.edition;
  const totalPages = data?.page_count;

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
      if (categoryFilterValue) {
        filters.push({
          field: "category",
          type: "eq",
          value: categoryFilterValue,
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

  const onCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilterValue(event.target.value);
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
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilterValue}
        onChange={onNameFilterChange}
      />
      <select value={categoryFilterValue} onChange={onCategoryFilterChange}>
        <option value="">All Categories</option>
        <option value="annual_report">Annual Report</option>
        <option value="branded_content">Branded content</option>
        <option value="brochure">Brochure</option>
        <option value="case_study">Case Study</option>
        <option value="customer_magazine">Customer Magazine</option>
        <option value="ebook">eBook</option>
        <option value="event_magazine">Event magazine</option>
        <option value="manual">Manual</option>
        <option value="member_magazine">Member Magazine</option>
        <option value="newsletter">Newsletter</option>
        <option value="pitch_deck">Pitch Deck</option>
        <option value="presentation">Presentation</option>
        <option value="proposal">Proposal</option>
        <option value="product_catalog">Product catalog</option>
        <option value="report">Report</option>
        <option value="staff_magazine">Staff Magazine</option>
        <option value="whitepaper">White Paper</option>
        <option value="other">Other</option>
      </select>
      <ul>
        {docs?.map((doc) => (
          <li key={doc.id}>{doc.name}</li>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Documents;
