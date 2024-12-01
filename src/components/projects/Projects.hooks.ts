import { PAGE_SIZE } from "@/shared/constants";
import { FilterByNameType } from "@/shared/filter-by-name/FilterByName";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseDocsResult {
  data: any;
  loading: boolean;
  error: string | null;
}

export const useProjects = (
  page: number,
  filter: FilterByNameType[],
  isAuthenticated: boolean
): UseDocsResult => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.foleon.com/v2/magazine/title",
          {
            params: {
              page,
              limit: PAGE_SIZE,
              filter,
            },
          }
        );
        setData(response.data);
      } catch {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, filter, isAuthenticated]);

  return { data, loading, error };
};
