import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { createExpense as createExpenseApi } from '../../services/apiExpenses';
import type {
  ApiError,
  CreateExpensePayload,
  Expense,
} from '../../types/types';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  const {
    mutate: createExpense,
    isPending: isCreating,
    error,
  } = useMutation<Expense, AxiosError<ApiError>, CreateExpensePayload>({
    mutationFn: (newExpense: CreateExpensePayload) =>
      createExpenseApi(newExpense),
    onSuccess: () => {
      toast.success('New expense created');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create expense');
    },
  });

  return { createExpense, isCreating, error };
}
