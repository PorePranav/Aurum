import { useQuery } from '@tanstack/react-query';

import { fetchCategories as fetchCategoriesApi } from '../../services/apiCategories';
import type { ApiError, Category } from '../../types/types';

export function useCategories() {
  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery<Category[], ApiError>({
    queryKey: ['categories'],
    queryFn: fetchCategoriesApi,
  });

  return {
    categories,
    isPending,
    error,
  };
}
