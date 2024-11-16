import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseProjectsResult {
  data: any;
  loading: boolean;
  error: string | null;
}

export const useProjects = (
  page: number,
  limit: number,
  filter: string,
  orderBy: string,
  isAuthenticated: boolean
): UseProjectsResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.foleon.com/v2/magazine/title', {
          params: {
            page,
            limit,
            filter,
            'order-by': orderBy
          }
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, limit, filter, orderBy, isAuthenticated]);

  return { data, loading, error };
};