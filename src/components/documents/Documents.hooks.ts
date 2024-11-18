import { PAGE_SIZE } from "@/shared/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseDocsResult {
  data: any;
  loading: boolean;
  error: string | null;
}

export const useDocs = (
  page: number,
  filter: any[],
  isAuthenticated: boolean
): UseDocsResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.foleon.com/v2/magazine/edition",
          {
            params: {
              page,
              limit: PAGE_SIZE,
              filter,
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
  }, [page, filter, isAuthenticated]);

  return { data, loading, error };
};
