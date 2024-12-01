import { PAGE_SIZE } from "@/shared/constants";
import { FilterByCategoryType } from "@/shared/filter-by-category/FilterByCategory";
import { FilterByNameType } from "@/shared/filter-by-name/FilterByName";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseDocsResult {
  data: any;
  loading: boolean;
  error: string | null;
}

export const useDocs = (
  page: number,
  filter: (FilterByNameType | FilterByCategoryType)[],
  isAuthenticated: boolean
): UseDocsResult => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDocs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.foleon.com/v2/magazine/edition", {
          params: {
            page,
            limit: PAGE_SIZE,
            filter,
          },
        });
        setData(response.data);
      } catch {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [page, filter, isAuthenticated]);

  return { data, loading, error };
};
