import type { CreateExpensePayload } from '../types/types';
import api from './api';

export async function fetchExpenses() {
  const { data } = await api.get('/expenses', { withCredentials: true });

  return data.data;
}

export async function createExpense({
  date,
  item,
  amount,
  paymentMethod,
  categoryId,
  paidTo,
  description,
}: CreateExpensePayload) {
  const { data } = await api.post(
    '/expenses',
    {
      date,
      item,
      amount,
      paymentMethod,
      categoryId,
      paidTo,
      description,
    },
    { withCredentials: true },
  );

  return data.data;
}
