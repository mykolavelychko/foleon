import axios from "axios";
import { useEffect, useState } from "react";

interface UseDocsResult {
  data: any;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch Foleon Docs
 * @param page
 * @param limit
 * @param filter
 * @param orderBy
 * @param isAuthenticated
 * @returns
 */
export const useDocs = (
  page: number,
  limit: number,
  filter: any[],
  orderBy: string,
  isAuthenticated: boolean
): UseDocsResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://api.foleon.com/v2/magazine/edition",
          {
            params: {
              page,
              limit,
              filter,
              "order-by": orderBy,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, limit, filter, orderBy, isAuthenticated]);

  return { data, loading, error };
};
