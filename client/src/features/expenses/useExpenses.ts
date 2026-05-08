import { useQuery } from '@tanstack/react-query';

import { fetchExpenses as fetchExpensesApi } from '../../services/apiExpenses';
import type { ApiError, Expense } from '../../types/types';

export function useExpenses() {
  const {
    data: expenses = [],
    isPending,
    error,
  } = useQuery<Expense[], ApiError>({
    queryKey: ['expenses'],
    queryFn: fetchExpensesApi,
  });

  return {
    expenses,
    isPending,
    error,
  };
}